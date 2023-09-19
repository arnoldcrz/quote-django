import { initializePartNumberInput, addRowToTable } from "./functions.js";
import { updateAmount, updateSubTotalAndTotalDue } from "./accounting.js";


document.getElementById('print-button').addEventListener('click', () => {
  window.print();
});

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.add-row');
  const tableContainer = document.querySelector('.table-container');

  let data = []; // Initialize an empty array for the data

  fetch('backend/products.json') // Replace with your JSON file path
    .then(response => response.json())
    .then(fetchedData => {
      data = fetchedData; // Assign the fetched data to the global data variable

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