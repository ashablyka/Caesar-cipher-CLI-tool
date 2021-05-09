import fs from 'fs';

export default function checkFileAccess(path) {
  try {
    fs.accessSync(path, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK);
  } catch (err) {
    process.stderr.write(`error: file ${path} doesn't exist or not accessible\n`);
    process.exit(1);
  }
}
