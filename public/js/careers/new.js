const fileInputs = Array.from(document.getElementsByClassName("image-input"));
const labels = document.querySelectorAll(".image-label"); // Match all upload-img circles

// Add tag input toggler
const tagToggler = document.getElementById("tag-toggler");
const addTagBtn = document.getElementById("add-tag-btn");
const confirmTagBtn = document.getElementById("confirm-tag-btn");
const addedTagsDiv = document.getElementById("added-tags-div");
const tagInput = document.getElementById("tag-input");
// const addedTagsInput = document.getElementById("added-tags");
const addedTags = addedTagsDiv.children;

addTagBtn.addEventListener("click", () => {
  if (tagToggler.style.display === "none") {
    tagToggler.style.display = "";
    addTagBtn.style.display = "none";
  }
});

confirmTagBtn.addEventListener("click", () => {
  if (tagInput.value === "") {
    tagInput.setCustomValidity("Insira uma tag válida.");
    tagInput.reportValidity();
    return;
  }
  tagToggler.style.display = "none";
  addTagBtn.style.display = "";

  const tagName = tagInput.value; // Replace with your actual tag name variable
  const newTag = document.createElement("button");
  newTag.className = "btn btn-sm btn-outline-dark me-2";
  newTag.type = "button";
  newTag.innerHTML = `${tagName}<i class="bi bi-x ms-1"></i>`;
  addedTagsDiv.appendChild(newTag);
  tagInput.value = "";

  // to delete tags whenever they are clicked
  Array.from(addedTagsDiv.children).forEach((tag) => {
    const tagName = tag.innerText;
    tag.addEventListener("click", (e) => {
      e.preventDefault();

      const hiddenInput = Array.from(
        addedTagsDiv.getElementsByTagName("input")
      ).find((input) => input.value === tagName);
      if (hiddenInput) hiddenInput.remove();
      tag.remove();
    });
  });

  // Adding tags to the form through hidden input
  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "tags[]"; // Using array notation for Express
  hiddenInput.value = tagName;
  addedTagsDiv.appendChild(hiddenInput);
});

// to delete tags whenever they are clicked (when editing form)
Array.from(addedTagsDiv.children).forEach((tag) => {
  const tagName = tag.innerText;
  tag.addEventListener("click", (e) => {
    e.preventDefault();

    const hiddenInput = Array.from(
      addedTagsDiv.getElementsByTagName("input")
    ).find((input) => input.value === tagName);
    if (hiddenInput) hiddenInput.remove();
    tag.remove();
  });
});

// to print tags whenever they change
// const logTags = () => {
//   const tags = Array.from(addedTagsDiv.getElementsByTagName("input"))
//     .map((input) => input.value)
//     .filter(Boolean);
//   console.log("Current tags:", tags);
// };
// const observer = new MutationObserver(logTags);
// observer.observe(addedTagsDiv, { childList: true, subtree: true });

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
