// buttons
const candidate = document.getElementsByClassName("option-btn")[0];
const company = document.getElementsByClassName("option-btn")[1];
const menu = document.getElementById("buttons-row");

// forms
const companyForm = document.querySelector("#company-form");
const candidateForm = document.querySelector("#candidate-form");

// inputs
const roleInput = document.getElementById("user-role-input");

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");

  roleInput.value = user;

  if (user === "company") {
    // COMPANY FORM
    menu.style.display = "none";
    companyForm.style.display = "block";

    // country select change event
    const countrySelect = document.getElementById("country");
    const stateSelect = document.getElementById("state");
    const cityInput = document.getElementById("city");

    countrySelect.addEventListener("change", function (e) {
      const selectedCountry = e.target.value;
      if (selectedCountry === "Brasil") {
        stateSelect.style.display = "block";
        stateSelect.required = true;
        stateSelect.style.maxWidth = "30%";
        cityInput.style.maxWidth = "70%";
        cityInput.classList.remove("rounded-end");
      } else {
        stateSelect.style.display = "none";
        stateSelect.required = false;
        cityInput.style.maxWidth = "100%";
        cityInput.classList.add("rounded-end");
      }
    });
  } else if (user === "candidate") {
    // CANDIDATE FORM
    menu.style.display = "none";
    candidateForm.style.display = "block";

    // CV input validation
    const CV = document.getElementById("CV");
    const cvBtn = document.getElementById("CV-btn");
    const buttonText = document.getElementById("cv-file-text");

    CV.addEventListener("change", function (e) {
      const fileInput = e.target;
      const fileName = fileInput.files[0] ? fileInput.files[0].name : "";

      if (fileName) {
        if (cvBtn.classList.contains("is-invalid")) {
          cvBtn.classList.remove("is-invalid", "border", "border-danger");
        }

        buttonText.textContent = fileName;
      } else {
        buttonText.textContent = "Import CV";
      }
    });

    document.querySelector("form").addEventListener("submit", function (e) {
      if (CV.files.length === 0) {
        e.preventDefault();
        cvBtn.classList.add("border", "border-danger", "is-invalid");
      }
    });
  } else {
    menu.style.display = "block";
    if (companyForm) companyForm.style.display = "none";
    if (candidateForm) candidateForm.style.display = "none";
  }
});

const openCompanyForm = () => (window.location.href = "/cadastro?user=company");
const openCandidateForm = () =>
  (window.location.href = "/cadastro?user=candidate");
const backToMenu = () => (window.location.href = "/cadastro");

company.addEventListener("click", (e) => openCompanyForm(e));
candidate.addEventListener("click", (e) => openCandidateForm(e));

// flash message auto hide
const flashMessage = document.getElementById("flash-message");
if (flashMessage) {
  setTimeout(() => {
    flashMessage.style.display = "none";
  }, 5000);
}
