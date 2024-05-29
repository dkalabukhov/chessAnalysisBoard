const getRowAndCell = (name) => name.split('').reverse();
const makeAvailableCell = (name, effect) => ({ name, effect });

const cellsToNums = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
};
const numsToCells = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
};
const shiftCell = (cell, number) => numsToCells[cellsToNums[cell] + number];

const coord2name = ([col, row]) => `${numsToCells[col]}${row}`;
const name2coord = (name) => {
  const [row, cell] = getRowAndCell(name);
  return [Number(cellsToNums[cell]), Number(row)];
};

const getField = (matrix, [col, row]) => matrix[row][numsToCells[col]];

export {
  getRowAndCell, makeAvailableCell, shiftCell, coord2name, name2coord, getField,
};
