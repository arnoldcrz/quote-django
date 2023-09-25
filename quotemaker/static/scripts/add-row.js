import { updateAmount, updateSubTotalAndTotalDue } from "./accounting.js";

const tableContainer = document.querySelector('tbody');

document.addEventListener('DOMContentLoaded', () => {
  const addSectionButton = document.querySelector('.add-section');


  addSectionButton.addEventListener('click', () => {
    const sectionDivider = document.createElement('tr');
    sectionDivider.classList.add('divider', 'row-divider');
    sectionDivider.innerHTML = `
      <div class="table-cell section-cell" colspan="6">
        <input type="text" class="section-title">
      </div>`;
    tableContainer.appendChild(sectionDivider);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const addNotesButton = document.querySelector('.add-notes');

  addNotesButton.addEventListener('click', () => {
    const notesDivider = document.createElement('tr');
    notesDivider.classList.add('divider', 'row-notes');
    notesDivider.innerHTML = `
      <div class="table-cell notes" contenteditable="true">Notes:</br> 1. </div>`;
    tableContainer.appendChild(notesDivider);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const deleteButton = document.querySelector('.delete-row');

  deleteButton.addEventListener('click', () => {
    const rows = tableContainer.querySelectorAll('.table-row');
    const sectionDividers = tableContainer.querySelectorAll('.row-divider');
    const notesDividers = tableContainer.querySelectorAll('.row-notes');

    if (rows.length > 0 || sectionDividers.length > 0) {
      const lastRow = tableContainer.lastChild;
      if (lastRow.classList.contains('table-row') ||
        lastRow.classList.contains('row-divider') ||
        lastRow.classList.contains('row-notes')) {
        tableContainer.removeChild(lastRow);

        updateSubTotalAndTotalDue();
      }
    }
  });
});
