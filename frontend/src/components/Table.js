export const Table = ({ headers, data }) => {
  const table = document.createElement("table");
  table.classList.add("w-1/2", "bg-white", "shadow-md", "overflow-y-scroll");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.classList.add("border", "px-4", "py-2");
    th.textContent = header;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);

  data.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("tr");
      td.classList.add("border", "px-4", "py-2");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
};
