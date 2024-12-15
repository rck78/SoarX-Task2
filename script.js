document.addEventListener("DOMContentLoaded", () => {
    // Initialize Materialize input fields (required by Materialize)
    M.updateTextFields();
  
    // Add event listeners for all input fields
    document.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("focus", () => {
        const label = field.nextElementSibling;
        if (label) label.classList.add("active");
      });
  
      field.addEventListener("blur", () => {
        if (!field.value.trim()) {
          const label = field.nextElementSibling;
          if (label) label.classList.remove("active");
        }
      });
    });
  });
  