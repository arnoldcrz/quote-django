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
    option.value = part.part_number;
    option.text = part.part_number;
    input.appendChild(option);
  });

  const otherOption = document.createElement('option');
  otherOption.value = "Other";
  otherOption.text = "Other";
  input.appendChild(otherOption);

  input.addEventListener('change', event => {
    const selectedPartNumber = event.target.value;
    const selectedPart = data.find(part => part.part_number === selectedPartNumber);
    const row = input.closest('.table-row');
    const descriptionDiv = row.querySelector('.description');
    const rateDiv = row.querySelector('.rate');

    if (selectedPart && selectedPartNumber !== "Other") {
      descriptionDiv.textContent = selectedPart.description;
      rateDiv.textContent = selectedPart.rate;
    } else if (selectedPartNumber === "Other") {
      descriptionDiv.textContent = '';
      rateDiv.textContent = '';
    } else {
      descriptionDiv.textContent = '';
      rateDiv.textContent = '';
    }
  });
}

export function addRowToTable(tableContainer, data) {
  const tbody = tableContainer.querySelector('tbody');
  if (!tbody) {
    console.error('Table does not have a tbody element.');
    return;
  }

  const currentRowCount = tbody.querySelectorAll('.table-row').length + 1;
  const newRow = document.createElement('tr');
  newRow.classList.add('table-row');

  newRow.innerHTML = `
    <td class="table-cell">${currentRowCount}</td>
    <td class="table-cell">
      <select id="part-number-${currentRowCount}" class="part-number">
        <option value="" disabled selected>Choose a part number</option>
      </select>
    </td>
    <td class="table-cell"><input id="quantity-${currentRowCount}" type="number" class="quantity no-arrows" value="0"></td>
    <td class="table-cell description" contenteditable="true"></td>
    <td class="table-cell rate" contenteditable="true">0.00</td>
    <td class="table-cell amount">0.00</td>    
  `;

  tbody.appendChild(newRow);

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
        const newPartNumber = partNumberInput.value.trim();
        if (newPartNumber !== '') {
          const descriptionInput = row.querySelector('.description');
          const rateInput = row.querySelector('.rate');

          // Find the selected part based on the newPartNumber
          const selectedPart = data.find(part => part.part_number === newPartNumber);

          if (selectedPart) {
            descriptionInput.textContent = selectedPart.description;
            rateInput.textContent = selectedPart.rate;
          } else {
            descriptionInput.textContent = '';
            rateInput.textContent = '0.00';
          }
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