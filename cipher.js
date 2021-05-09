const ALPHABET_LENGTH = 26;
const FIRST_LOWERCASE_LETTER_CODE = 97;
const LAST_LOWERCASE_LETTER_CODE = 122;
const FIRST_UPPERCASE_LETTER_CODE = 65;
const LAST_UPPERCASE_LETTER_CODE = 90;

const cipher = (string, action, shift) => {
  if (action === 'decode') {
    shift = -(shift % ALPHABET_LENGTH);
  }

  const array = string.split('');
  const cipheredArray = array.map((symbol) => {
    const charCode = symbol.charCodeAt(0);

    if (charCode >= FIRST_UPPERCASE_LETTER_CODE && charCode <= LAST_UPPERCASE_LETTER_CODE) {
      return String.fromCharCode(FIRST_UPPERCASE_LETTER_CODE +
        (ALPHABET_LENGTH + charCode + shift - FIRST_UPPERCASE_LETTER_CODE) % ALPHABET_LENGTH);
    }

    if (charCode >= FIRST_LOWERCASE_LETTER_CODE && charCode <= LAST_LOWERCASE_LETTER_CODE) {
      return String.fromCharCode(FIRST_LOWERCASE_LETTER_CODE +
        (ALPHABET_LENGTH + charCode + shift - FIRST_LOWERCASE_LETTER_CODE) % ALPHABET_LENGTH);
    }

    return symbol;
  });
  return cipheredArray.join('');
}

export default cipher;
