const playFieldWrapper = document.querySelector(".playfield-wrapper"),
  playField = document.querySelector(".playfield"),
  gameWrapper = document.querySelector(".game_wrapper"),
  resultCounter = document.querySelector(".counter"),
  resultBlock = document.querySelector(".result"),
  playBtn = document.querySelectorAll(".play-btn"),
  levelItems = document.querySelectorAll(".level"),
  timer = document.querySelector(".timer"),
  menuBtn = document.querySelector(".back-to-menu");

let counter = 0;
let time = 30;
let inter;
let level;

resultCounter.textContent = counter;
timer.textContent = `00:${time}`;

levelItems.forEach((item) => {
  if (item.classList.contains("level-active")) {
    level = +item.getAttribute('data-level')
    console.log(level);
  } 
  item.addEventListener("click", (e) => {
    let target = e.target; 
    levelItems.forEach(el => {
      el.classList.remove('level-active')
    })
    target.classList.add('level-active')
    level = +target.getAttribute('data-level')

    console.log(level);
  });
});

playBtn.forEach((el) => {
  el.addEventListener("click", () => {
    gameWrapper.style.display = "none";
    playFieldWrapper.style.display = "flex";
    resultBlock.style.display = "none";

    counter = 0;
    resultCounter.textContent = counter;
    timer.textContent = `00:${time}`;

    createMouse();
    backTimer(time);
    if(level == 3){
      setTimeout(() => {
        inter = setInterval(() => {
          mouseMoving(document.querySelector(".mouse"));
        }, 1000);
      }, 500)
    }
    
  });
});

menuBtn.addEventListener("click", () => {
  gameWrapper.style.display = "flex";
  playFieldWrapper.style.display = "none";
  counter = 0;
  resultCounter.textContent = counter;
  resultBlock.style.display = "none";
  clearInterval(inter);

  if (playField.querySelector(".mouse")) {
    playField.querySelector(".mouse").remove();
  }
});

function createMouse() {
  let mouse = document.createElement("div");
  mouse.classList.add("mouse");

  let fieldX = playField.clientWidth - 40;
  let fieldY = playField.clientHeight - 50;

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
    s--;
    timer.textContent = `00:${s}`;
    if (s < 10) {
      timer.textContent = `00:0${s}`;
    }

    if (s == 0) {
      clearInterval(inter);
      clearInterval(interval);
      timer.textContent = `00:00`;
      playField.querySelector(".mouse").remove();
      showResult();
    }

    menuBtn.addEventListener("click", () => clearInterval(interval));
  }, 1000);
}

function showResult() {
  resultBlock.style.display = "flex";
  resultBlock.querySelector(
    ".result-info"
  ).textContent = `You catched ${counter} mouse :)`;
}

function mouseMoving(m) {
  let fieldX = playField.clientWidth - 40;
  let fieldY = playField.clientHeight - 50;

  let leftM = Math.floor(Math.random() * fieldX);
  let topM = Math.floor(Math.random() * fieldY);

  console.log(leftM, topM);

  m.style.left = leftM + "px";
  m.style.top = topM + "px";
}
