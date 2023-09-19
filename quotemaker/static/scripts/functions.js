import { formatCurrency } from "./utils/currency.js";
import { updateAmount, updateSubTotalAndTotalDue } from "./accounting.js";

export function initializePartNumberInput(input, data) {
  const placeholderOption = document.createElement('option');
  placeholderOption.value = "";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  placeholderOption.textContent = "Choose a part number";
  input.appendChild(placeholderOption);

  data.forEach(part => {
    const option = document.createElement('option');
    option.value = part["Part Number"];
    option.text = part["Part Number"];
    input.appendChild(option);
  });

  const otherOption = document.createElement('option');
  otherOption.value = "Other";
  otherOption.text = "Other";
  input.appendChild(otherOption);

  input.addEventListener('change', event => {
    const selectedPartNumber = event.target.value;
    const selectedPart = data.find(part => part["Part Number"] === selectedPartNumber);
    const row = input.closest('.table-row');
    const descriptionDiv = row.querySelector('.description'); // Select the description div
    const rateDiv = row.querySelector('.rate');

    if (selectedPart && selectedPartNumber !== "Other") {
      descriptionDiv.textContent = selectedPart.Description; // Set description text
      rateDiv.textContent = selectedPart.Rate;
    } else if (selectedPartNumber === "Other") {
      descriptionDiv.textContent = ''; // Clear description text
      rateDiv.textContent = '';
    } else {
      descriptionDiv.textContent = ''; // Clear description text
      rateDiv.textContent = '';
    }
  });
}

export function addRowToTable(tableContainer, data) {
  const newRow = document.createElement('div');
  newRow.classList.add('table-row');

  const currentRowCount = document.querySelectorAll('.table-row').length + 1;

  newRow.innerHTML = `
    <div class="table-cell">${currentRowCount - 1}</div>
    <div class="table-cell">
      <select id="part-number-${currentRowCount - 1}" class="part-number">
        <option value="" disabled selected>Choose a part number</option>
      </select>
    </div>
    <div class="table-cell"><input id="quantity-${currentRowCount - 1}" type="number" class="quantity no-arrows" value="0"></div>
    <div class="table-cell description" contenteditable="true"></div>
    <div class="table-cell rate" contenteditable="true">0.00</div>
    <div class="table-cell amount">0.00</div>
  `;

  tableContainer.appendChild(newRow);

  const newPartNumberInput = newRow.querySelector('.part-number');
  initializePartNumberInput(newPartNumberInput, data);

  const newQuantityInput = newRow.querySelector('.quantity');
  newQuantityInput.addEventListener('input', () => {
    if (newQuantityInput.value < 0) {
      newQuantityInput.value = 0;
    }
    updateAmount(newRow);
    updateSubTotalAndTotalDue();
  });

  const newRateDiv = newRow.querySelector('.rate');
  newRateDiv.addEventListener('input', () => {
    updateAmount(newRow);
    updateSubTotalAndTotalDue();
  });

  const newPartNumberSelect = newRow.querySelector('.part-number');
  newPartNumberSelect.addEventListener('change', () => {
    const selectedPartNumber = newPartNumberSelect.value;
    const row = newPartNumberSelect.closest('.table-row');
    const quantityInput = row.querySelector('.quantity');

    if (selectedPartNumber === "Other") {
      quantityInput.value = 0;

      const partNumberInput = document.createElement('input');
      partNumberInput.type = 'text';
      partNumberInput.classList.add('part-number');
      partNumberInput.placeholder = 'Enter part number';
      newPartNumberSelect.replaceWith(partNumberInput);
      partNumberInput.addEventListener('change', () => {
        const newPartNumber = partNumberInput.value;
        if (newPartNumber.trim() !== '') {
          const descriptionInput = row.querySelector('.description');
          const rateInput = row.querySelector('.rate');

          updateAmount(row);
          updateSubTotalAndTotalDue();
        }
      });
    } else {
      quantityInput.value = 0;

      updateAmount(row);
      updateSubTotalAndTotalDue();
    }
  });
}