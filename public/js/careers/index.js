const openModalBtn = document.getElementById("open-modal-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const careerInput = document.getElementById("career-input");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
  window.history.pushState(null, "", "/carreiras/adicionar"); // change URL without reload
});

closeModalBtn.addEventListener("click", () => {
  careerInput.value = "";
  modal.style.display = "none";
  window.history.pushState(null, "", "/carreiras"); // revert to original path
});

// Close modal if user clicks outside modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    careerInput.value = "";
    modal.style.display = "none";
    window.history.pushState(null, "", "/carreiras");
  }
});
