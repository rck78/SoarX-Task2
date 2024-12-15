//JS for form submission and handling
document.getElementById("registration-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
  
    const messageElement = document.getElementById("message");
    const submitButton = document.getElementById("submit-button");
  
    // Display "Please wait" message
    messageElement.textContent = "Please wait...";
    messageElement.style.color = "blue";
    messageElement.style.display = "block";
    submitButton.disabled = true;
  
    // Collect form data
    const formData = new FormData(this);
    const formDataString = Array.from(formData.entries())
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
  
    // Send a POST request to Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbzENpo1Rv4lVSzCCnqaE-dZ4uSffWH4NiWxM1iE68210wfsd1xxxpZyxNqzvYKCG-M7BQ/exec",
      {
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          messageElement.textContent = "Form submitted successfully!";
          messageElement.style.color = "green";
  
          // Reset the form
          document.getElementById("registration-form").reset();
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
      .catch((error) => {
        console.error(error);
        messageElement.textContent = "An error occurred while submitting the form.";
        messageElement.style.color = "red";
      })
      .finally(() => {
        // Re-enable the submit button after handling the response
        submitButton.disabled = false;
  
        // Hide the message after 3 seconds
        setTimeout(() => {
          messageElement.style.display = "none";
        }, 3000);
      });
  });
  