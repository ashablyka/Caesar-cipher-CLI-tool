import { Command } from 'commander';
import fs from 'fs';
import checkFileAccess from './checkFileAccess.js';
import { Transform, pipeline } from 'stream';
import cipher from './cipher.js';

const program = new Command();

const VALID_ACTIONS = ['encode', 'decode'];

function processAction(action) {
  if (!VALID_ACTIONS.includes(action)) {
    process.stderr.write(`error: option '-a, --action <action>' must be one of these: ${VALID_ACTIONS.join(' ')}\n`);
    process.exit(1);
  }

  return action;
}

function processShift(shift) {
  const shiftNumber = Number(shift);

  if (!Number.isInteger(shiftNumber)) {
    process.stderr.write("error: option '-s, --shift <shift>' must be an integer number\n");
    process.exit(1);
  }

  return shiftNumber;
}

program
  .requiredOption('-a, --action <action>', 'an action encode/decode', processAction)
  .requiredOption('-s, --shift <shift>', 'a shift', processShift)
  .option('-i, --input <path>', 'an input file')
  .option('-o, --output <path>', 'an output file');

program.parse(process.argv);

const { action, shift, input, output } = program.opts();

let readStream;
let writeStream;

if (input) {
  checkFileAccess(input);
  readStream = fs.createReadStream(input);
} else {
  readStream = process.stdin;
}

if (output) {
  checkFileAccess(output);
  writeStream = fs.createWriteStream(output, { flags: 'a' });
} else {
  writeStream = process.stdout;
}

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const cipheredChunk = cipher(chunk.toString(), action, shift);
    this.push(cipheredChunk);
    callback();
  }
});

pipeline(
  readStream,
  transformStream,
  writeStream,
  (err) => {
    if (err) {
      process.stderr.write('error: pipeline failed', err);
      process.exit(1);
    }
  }
);
