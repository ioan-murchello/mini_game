function burgerMenu() {
  const burgerBtn = document.querySelector(".header__menu_icon"),
    btnLines = burgerBtn.querySelectorAll("span"),
    body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar");

  sidebar.addEventListener("click", (e) => {
    if (e.target.type == "text") return;

    sidebar.classList.remove("active");
    body.classList.remove("blocked");
    btnLines.forEach((line) => line.classList.remove("active-burger"));
  });

  burgerBtn.addEventListener("click", function () {
    if (!sidebar.classList.contains("active")) {
      sidebar.classList.add("active");
      btnLines.forEach((line) => line.classList.add("active-burger"));
      body.classList.add("blocked");
    } else {
      sidebar.classList.remove("active");
      body.classList.remove("blocked");
      btnLines.forEach((line) => line.classList.remove("active-burger"));
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      body.classList.remove("blocked");
      btnLines.forEach((line) => line.classList.remove("active-burger"));
    }
  });
}

burgerMenu();
