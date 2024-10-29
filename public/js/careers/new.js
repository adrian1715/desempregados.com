const fileInputs = Array.from(document.getElementsByClassName("image-input"));
const labels = document.querySelectorAll(".image-label"); // Match all upload-img circles

// Handle file selection and image preview
fileInputs.forEach((fileInput, index) => {
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      const currentLabel = labels[index];
      currentLabel.style.backgroundImage = `url(${imageUrl})`;

      currentLabel.classList.add("uploaded");
      currentLabel.textContent = "";
    }
  });
});
