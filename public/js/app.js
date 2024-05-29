// switching navbar visibility
window.addEventListener("scroll", function () {
  const navbarHeader = document.querySelector("#header-navbar");
  const scrollPosition = window.scrollY;

  if (scrollPosition > window.innerHeight) {
    // when it reaches the 100hv breakpoint (to hide navbar)
    navbarHeader.classList.add("invisible", "opacity-0");
  } else if (navbarHeader.classList.contains("invisible")) {
    navbarHeader.classList.remove("invisible", "opacity-0");
  }
});
