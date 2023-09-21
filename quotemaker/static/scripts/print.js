document.addEventListener('DOMContentLoaded', () => {
  const generatePDFButton = document.getElementById('print-button');
  generatePDFButton.addEventListener('click', () => {
    const tableData = [];
    const tableRows = document.querySelectorAll('tbody tr');

    function cleanText(text) {
      // Remove non-printable characters and extra spaces
      return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/g, '').trim();
    }

    tableRows.forEach((row) => {
      const rowData = [];
      row.querySelectorAll('td').forEach((cell, index) => {
        if (index === 1) {
          // Get the selected value from the part number cell
          const selectedPartNumber = cell.querySelector('select').value;
          rowData.push(selectedPartNumber);
        } else if (index === 2) {
          // Get the value from the quantity cell
          const quantityValue = cell.querySelector('input').value;
          rowData.push(quantityValue);
        } else if (index === 3) {
          // Get the text content from the description cell, clean it, and trim it
          const descriptionText = cleanText(cell.textContent);
          rowData.push(descriptionText);

        } else {
          rowData.push(cell.textContent);
        }
      });
      tableData.push(rowData);
    });
    // Ensure that tableData is not empty
    if (tableData.length === 0) {
      console.error('tableData is empty or not correctly structured');
      return;
    }
    // Send the table data to the server to generate the PDF
    const contentToPrint = {
      tableData: tableData,
    };

    fetch('/generate-pdf/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'), // If you're using CSRF protection
      },
      body: JSON.stringify(contentToPrint),
    })
      .then(response => response.blob())
      .then(data => {
        const pdfBlob = new Blob([data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        const newTab = window.open('', '_blank');
        newTab.location.href = pdfUrl;
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
      });
  });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
