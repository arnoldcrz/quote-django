
document.getElementById('print-button-pdf').addEventListener('click', () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const content = document.getElementById('page-content');

  const header = '<div style="text-align: center;">My Custom Header</div>';
  const footer = '<div style="text-align: center;">Page ' + pdf.internal.getNumberOfPages() + ' of ' + pdf.internal.pages.length + '</div>';

  pdf.fromHTML(content, 10, 10, {
    width: 190,
    elementHandlers: {
      '#ignore-pdf': function (element, renderer) {
        return true;
      }
    },
    margin: { top: 30 },
    pagesplit: true
  },
    function (dispose) {
      pdf.setPage(1);
      pdf.text(10, 10, header);
      pdf.setPage(pdf.internal.getNumberOfPages());
      pdf.text(10, pdf.internal.pageSize.height - 10, footer);
      pdf.save('my-document.pdf');
    });
});
