(function () {
  // Handle filter toggle chevron rotation
  const filterCollapse = document.getElementById("filterCollapse");
  const chevron = document.getElementById("filter-chevron");

  if (filterCollapse && chevron) {
    filterCollapse.addEventListener("show.bs.collapse", function () {
      chevron.classList.remove("bi-chevron-down");
      chevron.classList.add("bi-chevron-up");
    });

    filterCollapse.addEventListener("hide.bs.collapse", function () {
      chevron.classList.remove("bi-chevron-up");
      chevron.classList.add("bi-chevron-down");
    });
  }

  const careerSel = document.getElementById("filter-career");
  const companySel = document.getElementById("filter-company");
  const dateSel = document.getElementById("filter-date");
  const searchInput = document.getElementById("filter-search");
  const applyBtn = document.getElementById("btn-apply-filters");
  const clearBtn = document.getElementById("btn-clear-filters");
  const grid = document.getElementById("jobs-grid");

  function applyFilters() {
    const career = careerSel.value;
    const company = companySel.value;
    const dateOpt = dateSel.value;
    const q = (searchInput.value || "").trim().toLowerCase();

    const cards = Array.from(grid.querySelectorAll(".job-card"));
    const now = Date.now();

    cards.forEach((card) => {
      let visible = true;

      if (career) {
        visible = visible && card.dataset.positionId === career;
      }
      if (company) {
        visible = visible && card.dataset.companyId === company;
      }
      if (dateOpt === "7" || dateOpt === "30") {
        const days = parseInt(dateOpt, 10);
        const created = new Date(card.dataset.createdAt).getTime();
        if (isNaN(created)) visible = false;
        else visible = visible && now - created <= days * 24 * 60 * 60 * 1000;
      }

      if (q) {
        const titleDesc = card.dataset.titleDesc || "";
        visible = visible && titleDesc.includes(q);
      }

      card.style.display = visible ? "" : "none";
    });

    // sort if requested
    if (dateOpt === "newest" || dateOpt === "oldest") {
      const reversed = dateOpt === "oldest";
      const visibleCards = Array.from(
        grid.querySelectorAll(".job-card")
      ).filter((c) => c.style.display !== "none");
      visibleCards.sort((a, b) => {
        const ta = new Date(a.dataset.createdAt).getTime() || 0;
        const tb = new Date(b.dataset.createdAt).getTime() || 0;
        return reversed ? ta - tb : tb - ta;
      });
      // re-append in order
      visibleCards.forEach((c) => grid.appendChild(c));
    }
  }

  applyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    applyFilters();
  });
  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    careerSel.value = "";
    companySel.value = "";
    dateSel.value = "";
    searchInput.value = "";
    applyFilters();
  });

  // optional: live search
  let timeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(applyFilters, 250);
  });

  // initialize (in case server-side filters were set)
  applyFilters();
})();
