import { updateAmount, updateSubTotalAndTotalDue } from "./accounting.js";


document.addEventListener('DOMContentLoaded', () => {
  const addSectionButton = document.querySelector('.add-section');
  const tableContainer = document.querySelector('.table-container');

  addSectionButton.addEventListener('click', () => {
    const sectionDivider = document.createElement('div');
    sectionDivider.classList.add('table-container', 'section-divider');
    sectionDivider.innerHTML = `
      <div class="table-cell section-cell" colspan="6">
        <input type="text" class="section-title">
      </div>`;
    tableContainer.appendChild(sectionDivider);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const addNotesButton = document.querySelector('.add-notes');
  const tableContainer = document.querySelector('.table-container');

  addNotesButton.addEventListener('click', () => {
    const notesDivider = document.createElement('div');
    notesDivider.classList.add('table-container', 'notes-divider');
    notesDivider.innerHTML = `
      <div class="table-cell notes" contenteditable="true">Notes: </div>
      <div class="table-cell notes-line" contenteditable="true">1.</div>`;
    tableContainer.appendChild(notesDivider);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const deleteButton = document.querySelector('.delete-row');
  const tableContainer = document.querySelector('.table-container');

  deleteButton.addEventListener('click', () => {
    const rows = tableContainer.querySelectorAll('.table-row');
    const sectionDividers = tableContainer.querySelectorAll('.section-divider');
    const notesDividers = tableContainer.querySelectorAll('.notes-divider');

    if (rows.length > 0 || sectionDividers.length > 0) {
      const lastRow = tableContainer.lastChild;
      if (lastRow.classList.contains('table-row') ||
        lastRow.classList.contains('section-divider') ||
        lastRow.classList.contains('notes-divider')) {
        tableContainer.removeChild(lastRow);

        updateSubTotalAndTotalDue();
      }
    }
  });
});
