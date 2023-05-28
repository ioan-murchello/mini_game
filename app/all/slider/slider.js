//slider --------------------------------------------------
const navigate_btns = document.querySelector(".navigate__btns"),
  prev_btn = document.querySelector(".prev"),
  next_btn = document.querySelector(".next"),
  slider_window = document.querySelector(".slider__window"),
  slider_main = document.querySelector(".background__image"),
  slider_line = document.querySelector(".slider__line"),
  dots = document.querySelector(".navigate__dots"),
  current = document.querySelector(".current"),
  total = document.querySelector(".total"),
  height = window.getComputedStyle(slider_window).height;

let width = window.getComputedStyle(slider_window).offsetWidth;

let data = [
  {
    thumbnail: "./img/paracell.jpg",
    title: "Paracell",
    description: "Creative landing page",
    url: "https://ioan-murchello.github.io/paracell/",
  },
  {
    thumbnail: "./img/todolist.jpg",
    title: "ToDoList",
    description:
      "A todo list is a simple application that allows users to create and manage a list of tasks or items they need to complete. ",
    url: "https://ioan-murchello.github.io/toDoList/toDoList/",
  },
  {
    thumbnail: "./img/jhon's-site.jpg",
    title: "Jhon's resume",
    description: "Site for Jhon's presentation",
    url: "https://ioan-murchello.github.io/johns-portfolio/",
  },
  {
    thumbnail: "./img/typing-trainer.jpg",
    title: "Typing trainer",
    description:
      "A simulator that every novice developer should have.Only for PC(in developent)",
    url: "https://ioan-murchello.github.io/typing-trainer/keyTraniner/",
  },
  {
    thumbnail: "./img/avilio-site.jpg",
    title: "Take your way",
    description: "Landing page",
    url: "https://ioan-murchello.github.io/aviliosite/",
  },
];

// render slides
function renderSlides(arr, container) {
  let slide_body;
  let slide_item;

  for (let i = 0; i < arr.length; i++) {
    slide_item = document.createElement("div");
    slide_item.classList.add("slider__body-item");

    slide_body = renderSlide(arr[i]);
    slide_item.insertAdjacentHTML("afterbegin", slide_body);
    container.append(slide_item);
  }
}
renderSlides(data, slider_line);

function renderSlide({ thumbnail, title, description, url }) {
  return `<div class="slider__image-wrapper">
                <img src=${thumbnail} alt="image" />
              </div>
              <div class="slider__description">
                <div class="slider__description-title">${title}</div>
                <div class="slider__description-text">
                  ${description}
                </div>
                <a href=${url} target="_blank" class="slider__description-btn btn"
                  >Open
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.74994 0.750061V2.25006H8.69244L-6.10352e-05 10.9426L1.05744 12.0001L9.74994 3.30756V8.25006H11.2499V0.750061H3.74994Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
             `;
}

let slides = document.querySelectorAll(".slider__body-item");
let description_item = document.querySelectorAll(".slider__description");
//resize description blocks
function resizer() {
  let heithNums = [];
  let height;
  description_item.forEach((el) => {
    heithNums.push(el.offsetHeight);
  });
  height = Math.max(...heithNums);
  description_item.forEach((el) => (el.style.height = height + "px"));
}
resizer();

let index = 1;
let offset = 0;
let data_length = data.length;

function moreThen10(arrLength, current, index) {
  if (arrLength < 10) {
    current.textContent = `0${index}/`;
  } else {
    current.textContent = index;
  }
}

if (data_length < 10) {
  total.textContent = `0${data_length}`;
  current.textContent = `0${index}/`;
} else {
  total.textContent = data_length;
  current.textContent = index;
}

slider_line.style.transition = "all 0.5s";

slides.forEach((el) => {
  el.style.width = width + "px";
  el.style.height = height + "px";
});
description_item.forEach((el) => {
  el.style.width = width + "px";
  el.style.height = height + "px";
});

//make size for all images
function makeSize() {
  width = slider_window.offsetWidth;
  slides.forEach((el) => {
    el.style.width = width + "px";
    el.style.height = height + "px";
  });

  slider_line.style.width = width * slides.length + "px";
  rollSlider();
}

makeSize();
window.addEventListener("resize", makeSize);

//move_slider
function rollSlider() {
  slider_line.style.transform = `translateX(-${offset * width}px)`;
}

//handlers
next_btn.addEventListener("click", () => {
  if (offset >= data_length - 1) {
    offset = 0;
  } else {
    offset++;
  }

  if (index > offset) {
    index = 0;
  }

  if (index === data_length) {
    index = 1;
  } else {
    index++;
  }

  moreThen10(data_length, current, index);
  rollSlider();
  activeDots(index);
});

prev_btn.addEventListener("click", () => {
  if (offset <= 0) {
    offset = data_length - 1;
  } else {
    offset--;
  }

  if (index === 1) {
    index = data_length;
  } else {
    index--;
  }

  if (index < offset) {
    index = data_length;
  }

  moreThen10(data_length, current, index);
  rollSlider();
  activeDots(index);
});

//dots---------------------------------------------
  let dotsArray = [];
  function renderDots(length, container) {
    let dot;

    for (let i = length; i > 0; i--) {
      dot = createDots(i);
      dotsArray.push(dot);
      container.insertAdjacentHTML("afterbegin", dot);
    }
  }

  function createDots(index) {
    return `<div class="dots dots__outside" data-slide-to=${index}>
            <div class="dots__inside" data-slide-to=${index}></div>
          </div>`;
  }

  renderDots(data_length, dots);

  let insideDots = document.querySelectorAll(".dots__inside");
  let outsideDots = document.querySelectorAll(".dots__outside");
  outsideDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      let slideTo;
      let target = e.target;
      let attr = target.getAttribute("data-slide-to");
      slideTo = attr;
      index = slideTo;
      offset = slideTo - 1;

      if (data_length < 10) {
        current.textContent = `0${index}/`;
      } else {
        current.textContent = index;
      }
      rollSlider();
      activeDots(attr);
    });
  });

  function activeDots(index) {
    insideDots.forEach(function (el) {
      if (el.classList.contains("dots__active")) {
        el.classList.remove("dots__active");
      }
      if (el.dataset.slideTo == index) {
        el.classList.add("dots__active");
      }
    });
  }

  activeDots(index);

  //slide-end-------------------------------------------------------------
