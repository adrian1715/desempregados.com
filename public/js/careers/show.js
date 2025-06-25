const openModalBtn = document.getElementById("open-modal-btn");
const modal = document.getElementById("modal");
const closeModalBtns = document.getElementsByClassName("close-modal-btn");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Handle all elements with close-modal-btn class
for (let i = 0; i < closeModalBtns.length; i++) {
  closeModalBtns[i].addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Close modal if user clicks outside modal content (backdrop)
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
