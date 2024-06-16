const reverseDictionary = {
  0: '',
  1: 'h',
  2: 'g',
  3: 'f',
  4: 'e',
  5: 'd',
  6: 'c',
  7: 'b',
  8: 'a',
  9: '',
};

export default (boardRows) => {
  const rows = Array.from(boardRows);
  const rowCells = rows.map((row) => Array.from(row.children));
  rowCells.forEach((row, rowIndex) => {
    row.forEach((cell, collIndex) => {
      if (rowIndex === 0 || rowIndex === 9) {
        cell.textContent = reverseDictionary[collIndex];
      } else {
        switch (collIndex) {
          case 0:
            cell.dataset.cell = `left-${rowIndex}`;
            cell.textContent = rowIndex;
            break;
          case 9:
            cell.dataset.cell = `right-${rowIndex}`;
            cell.textContent = rowIndex;
            break;
          default:
            cell.dataset.cell = `${reverseDictionary[collIndex]}${rowIndex}`;
        }
      }
    });
  });
};

// *** previous solution
// const indexToColl = (num) => {
//   const dictionary = {
//     0: 'h',
//     1: 'g',
//     2: 'f',
//     3: 'e',
//     4: 'd',
//     5: 'c',
//     6: 'b',
//     7: 'a',
//   };
//   return dictionary[num];
// };

// export default (boardRows) => {
//   const rows = Array.from(boardRows);
//   const rowCells = rows.map((row) => Array.from(row.children));
//   rowCells.forEach((row, rowIndex) => {
//     row.forEach((cell, collIndex) => {
//       cell.dataset.cell = `${indexToColl(collIndex)}${rowIndex + 1}`;
//     });
//   });
// };
