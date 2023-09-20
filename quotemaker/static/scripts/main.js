import { initializePartNumberInput, addRowToTable } from "./functions.js";
import { updateSubTotalAndTotalDue } from "./accounting.js";


document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.add-row');
  const tableContainer = document.querySelector('.table-container');

  let data = [];

  fetch('/product-list-json/')
    .then(response => response.json())
    .then(fetchedData => {
      data = fetchedData;

      const partNumberInputs = document.querySelectorAll('.part-number');
      partNumberInputs.forEach(input => {
        initializePartNumberInput(input, data);
      });
    })
    .catch(error => console.error('Error fetching JSON:', error));

  addButton.addEventListener('click', () => {
    addRowToTable(tableContainer, data);
  });

  const accountOptionInputs = document.querySelectorAll('.account-option');
  accountOptionInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value < 0) {
        input.value = 0;
      }
      updateSubTotalAndTotalDue(); // Call the function to update totals
    });
  });
});