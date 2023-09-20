
const printButton = document.getElementById('print-button');
const quoteContent = document.getElementById('quote-content');

printButton.addEventListener('click', () => {
  const contentToPrint = quoteContent.innerHTML;
  fetch('/generate-pdf/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken') // If you're using CSRF protection
    },
    body: JSON.stringify({ contentToPrint }),
  })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    })
    .catch(error => {
      console.error('Error generating PDF:', error);
    });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

