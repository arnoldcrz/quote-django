document.addEventListener('DOMContentLoaded', () => {
  const toggleDiscount = document.getElementById('toggle-discount');
  const toggleVat = document.getElementById('toggle-vat');
  const toggleFreight = document.getElementById('toggle-freight');

  const discountRow = document.querySelector('label[for="discount"]').parentNode;
  const vatRow = document.querySelector('label[for="vat"]').parentNode;
  const freightRow = document.querySelector('label[for="freight"]').parentNode;

  toggleDiscount.addEventListener('change', () => {
    discountRow.style.display = toggleDiscount.checked ? 'block' : 'none';
    
  });

  toggleVat.addEventListener('change', () => {
    vatRow.style.display = toggleVat.checked ? 'block' : 'none';
    
  });

  toggleFreight.addEventListener('change', () => {
    freightRow.style.display = toggleFreight.checked ? 'block' : 'none';
   
  });
});
