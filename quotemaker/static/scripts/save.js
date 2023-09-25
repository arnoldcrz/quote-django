$(document).ready(function () {
  $("#save-button").on("click", function () {
    console.log("PDF button clicked.");

    // Capture the HTML content you want to include in the PDF
    var capturedHtml = $('content').html();
    console.log("Captured HTML content:", htmlContent); // Log the captured content

    // Get the CSRF token from the cookie
    var csrfToken = getCookie("csrftoken");

    // Create headers with the CSRF token
    var headers = {
      "X-CSRFToken": csrfToken
    };

    // Send the HTML content to the Django view via AJAX
    $.ajax({
      type: "POST",
      url: "/save-html/",
      data: { captured_html: capturedHtml },
      success: function (data) {
        alert('HTML structure saved successfully.');
      },
      error: function (error) {
        alert('Error saving HTML structure.');
      }
    });
  });


  // Function to get a cookie by name
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});
