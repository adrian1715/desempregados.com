(function () {
  "use strict";

  // Bootstrap client-side validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        // If checkbox is unchecked (not remote), make location required before validation
        const isRemote = document.getElementById("isRemote").checked;
        const locationInput = document.getElementById("location");
        if (!isRemote) {
          locationInput.setAttribute("required", "required");
        } else {
          locationInput.removeAttribute("required");
        }

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });

  // Toggle location visibility + requirement when switching remote flag
  const isRemoteEl = document.getElementById("isRemote");
  const locationGroup = document.getElementById("location-group");
  function updateLocationVisibility() {
    if (isRemoteEl.checked) {
      locationGroup.style.display = "none";
      document.getElementById("location").removeAttribute("required");
    } else {
      locationGroup.style.display = "";
    }
  }
  isRemoteEl.addEventListener("change", updateLocationVisibility);
  // initialize
  updateLocationVisibility();
})();
