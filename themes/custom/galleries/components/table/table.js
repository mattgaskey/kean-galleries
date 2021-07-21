const setUpResponsiveTables = () => {
  const tables = document.querySelectorAll('.table-wrapper--columnize table');
  if (!tables.length) return;

  for (const table of tables) {
    const headers = table.querySelectorAll('th');
    const dataCells = table.querySelectorAll('td');

    for (const cell of dataCells) {
      const index = [...cell.parentElement.children].indexOf(cell);
      const header = headers[index];
      const text = header.dataset.label || header.textContent;
      cell.dataset.label = `${text}:`;
    }
  }
};

if (self === top) setUpResponsiveTables();

export default setUpResponsiveTables;