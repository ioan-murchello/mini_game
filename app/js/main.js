const playField = document.querySelector(".playfield"),
  gameWrapper = document.querySelector(".game_wrapper"),
  resultCounter = document.querySelector(".counter"),
  resultBlock = document.querySelector(".result"),
  playBtn = document.querySelectorAll(".play-btn"),
  timer = document.querySelector(".timer"),
  menuBtn = document.querySelector(".back-to-menu");

let counter = 0;
let time = 10;

resultCounter.textContent = counter;
timer.textContent = `00:${time}`;

playBtn.forEach((el) => {
  el.addEventListener("click", () => {
    gameWrapper.style.display = "none";
    playField.style.display = "block";
    resultBlock.style.display = "none";

    counter = 0
    resultCounter.textContent = counter;
    timer.textContent = `00:${time}`;

    createMouse();
    backTimer(time);
  });
});

// playBtnSecond.addEventListener("click", () => {
//   resultBlock.style.display = "none";
//   //   counter = 0;
//   //   resultBlock.querySelector(
//   //     ".result-info"
//   //   ).textContent = `Your result is : ${counter}`;
//   createMouse();
//   backTimer(time);
// });

menuBtn.addEventListener("click", () => {
  gameWrapper.style.display = "flex";
  playField.style.display = "none";
  counter = 0;
  resultCounter.textContent = counter;
  resultBlock.style.display = "none";

  if (playField.querySelector(".mouse")) {
    playField.querySelector(".mouse").remove();
  }
});

function createMouse() {
  let mouse = document.createElement("div");
  mouse.classList.add("mouse");

  let fieldX = playField.clientWidth - 40;
  let fieldY = playField.clientHeight - 40;

  //   let mouseW = mouse.offsetWidth;
  //   let mouseY = mouse.offsetHeight;

  let maxW = Math.floor(Math.random() * (fieldX - 20));
  let maxY = Math.floor(Math.random() * (fieldY - 20));

  mouse.style.left = maxW + "px";
  mouse.style.top = maxY + "px";

  playField.appendChild(mouse);

  mouse.addEventListener("click", (e) => {
    removeMouse(e);
  });
}

function removeMouse(e) {
  counter++;
  resultCounter.textContent = counter;
  e.target.remove();
  createMouse();
}

function backTimer(seconds) {
  let s = seconds;

  let interval = setInterval(() => {
    seconds--;
    if (seconds < 10) {
      let widthNull = `0${seconds}`;
      timer.textContent = `00:${widthNull}`;
    }

    if (seconds == 0) {
      clearInterval(interval);
      timer.textContent = `00:00`;
      playField.querySelector(".mouse").remove();
      showResult();
    }

    menuBtn.addEventListener('click', () => clearInterval(interval))
  }, 1000);
}

function showResult() {
  resultBlock.style.display = "flex";
  resultBlock.querySelector(
    ".result-info"
  ).textContent = `Your result is : ${counter}`;
}
