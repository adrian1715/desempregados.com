(function () {
  const openModalBtn = document.getElementById("open-modal-btn");
  const modal = document.getElementById("modal");
  const closeModalBtns = document.getElementsByClassName("close-modal-btn");

  if (!openModalBtn || !modal) return;

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  for (let i = 0; i < closeModalBtns.length; i++) {
    closeModalBtns[i].addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
})();
