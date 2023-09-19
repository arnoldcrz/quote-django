function formatCurrency(amount) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");  //  return "$" + amount
}

const subTotalSpan = document.getElementById('sub-total-value');
const discount1Input = document.getElementById('discount-1');
const discount2Input = document.getElementById('discount-2');
const vatInput = document.getElementById('vat');
const freightInput = document.getElementById('freight');
const totalDueSpan = document.getElementById('total-due-value');

function updateAmount(inputRow) {
  const quantityInput = inputRow.querySelector('.quantity');
  const rateDiv = inputRow.querySelector('.rate');
  const amountDiv = inputRow.querySelector('.amount');

  const quantity = parseFloat(quantityInput.value);
  const rate = parseFloat(rateDiv.textContent.replace(/[^0-9.-]+/g, ""));

  if (!isNaN(quantity) && !isNaN(rate)) {
    const amount = quantity * rate;
    amountDiv.textContent = formatCurrency(amount);
  } else {
    amountDiv.textContent = '0.00';
  }

  updateSubTotalAndTotalDue();
}

function updateSubTotalAndTotalDue() {
  let subTotal = 0;
  const amountDivs = Array.from(document.querySelectorAll('.amount'));
  amountDivs.forEach(amountDiv => {
    const amountValue = parseFloat(amountDiv.textContent.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(amountValue)) {
      subTotal += amountValue;
    }
  });

  const discount1 = parseFloat(discount1Input.value) || 0;
  const discount2 = parseFloat(discount2Input.value) || 0;
  const vat = parseFloat(vatInput.value) || 0;
  const freight = parseFloat(freightInput.value) || 0;
  const totalDue = subTotal - (subTotal * discount1 / 100) - (subTotal * discount2 / 100) + vat + freight;

  subTotalSpan.textContent = formatCurrency(subTotal);
  totalDueSpan.textContent = formatCurrency(totalDue);

  discount1Input.addEventListener('input', updateSubTotalAndTotalDue);
  discount2Input.addEventListener('input', updateSubTotalAndTotalDue);
  vatInput.addEventListener('input', updateSubTotalAndTotalDue);
  freightInput.addEventListener('input', updateSubTotalAndTotalDue);
}

function initializePartNumberInput(input, data) {
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
      rateDiv.textContent = formatCurrency(selectedPart.Rate);
    } else if (selectedPartNumber === "Other") {
      descriptionDiv.textContent = ''; // Clear description text
      rateDiv.textContent = '';
    } else {
      descriptionDiv.textContent = ''; // Clear description text
      rateDiv.textContent = '';
    }
  });
}

function addRowToTable(tableContainer, data) {
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
  const accountOptionToggles = document.querySelectorAll('.account-option-toggle');

  accountOptionToggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      const isChecked = toggle.checked;
      const correspondingInput = toggle.nextElementSibling; // Get the corresponding input element
      correspondingInput.style.display = isChecked ? 'block' : 'none';

      updateSubTotalAndTotalDue(); // Call the function to update totals
    });
  });
});


