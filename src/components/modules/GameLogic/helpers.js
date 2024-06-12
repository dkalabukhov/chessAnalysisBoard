const parse = (array) => array
  .map((char) => {
    if (char >= '0' && char <= '8') {
      const count = parseInt(char, 10);
      return '-'.repeat(count);
    }
    return char;
  }).join('').split('');

export default parse;
