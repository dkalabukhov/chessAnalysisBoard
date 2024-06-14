const indexToColl = (num) => {
  const dictionary = {
    0: 'h',
    1: 'g',
    2: 'f',
    3: 'e',
    4: 'd',
    5: 'c',
    6: 'b',
    7: 'a',
  };
  return dictionary[num];
};

export default (boardRows) => {
  const rows = Array.from(boardRows);
  const rowCells = rows.map((row) => Array.from(row.children));
  rowCells.forEach((row, rowIndex) => {
    row.forEach((cell, collIndex) => {
      cell.dataset.cell = `${indexToColl(collIndex)}${rowIndex + 1}`;
    });
  });
};
