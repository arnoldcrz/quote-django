import { formatCurrency } from "./utils/currency.js";

const subTotalInput = document.getElementById('sub-total-value');
const discountInput = document.getElementById('discount')
const vatInput = document.getElementById('vat');
const freightInput = document.getElementById('freight');
const totalDueInput = document.getElementById('total-due-value');

export function updateAmount(inputRow) {
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

export function updateSubTotalAndTotalDue() {
  let subTotal = 0;
  const amountDivs = Array.from(document.querySelectorAll('.amount'));
  amountDivs.forEach(amountDiv => {
    const amountValue = parseFloat(amountDiv.textContent.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(amountValue)) {
      subTotal += amountValue;
    }
  });

  const discount = parseFloat(discountInput.value) || 0;
  const vat = parseFloat(vatInput.value) || 0;
  const freight = parseFloat(freightInput.value) || 0; 
  const totalDue = subTotal - (subTotal * discount / 100) + vat + freight;

  subTotalInput.value = formatCurrency(subTotal);
  totalDueInput.value = formatCurrency(totalDue);
  discountInput.addEventListener('input', updateSubTotalAndTotalDue); 
  vatInput.addEventListener('input', updateSubTotalAndTotalDue);
  freightInput.addEventListener('input', updateSubTotalAndTotalDue);
}
