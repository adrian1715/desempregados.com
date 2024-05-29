const company = document.getElementsByClassName("option-btn")[0];
const candidate = document.getElementsByClassName("option-btn")[1];
const menu = document.getElementById("buttons-row");

const companyForm = document.querySelector("#company-form");
const candidateForm = document.querySelector("#candidate-form");

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");

  if (user === "company") {
    menu.style.display = "none";
    companyForm.style.display = "block";
  } else if (user === "candidate") {
    menu.style.display = "none";
    candidateForm.style.display = "block";
  } else {
    menu.style.display = "flex";
    companyForm.style.display = "none";
    candidateForm.style.display = "none";
  }
});

const openCompanyForm = () => (window.location.href = "/register?user=company");
const openCandidateForm = () =>
  (window.location.href = "/register?user=candidate");
const backToMenu = () => (window.location.href = "/register");

company.addEventListener("click", (e) => openCompanyForm(e));
candidate.addEventListener("click", (e) => openCandidateForm(e));
