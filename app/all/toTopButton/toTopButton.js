 
 function toTop () {
    const offset = 100;
    const scrollUp = document.querySelector(".to-top");

    function getTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }

    window.addEventListener("scroll", () => {
      if (getTop() > offset) {
        scrollUp.style.display = "flex";
      } else {
        scrollUp.style.display = "none";
      }
    });

    scrollUp.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
}
