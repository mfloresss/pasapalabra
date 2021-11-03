import { words } from "./keyswords.js";

// ----------------------------------------------
//                    VARIABLES
// ----------------------------------------------

let aux = 0;
let cont = 0;
let score = 0;
let minutes = 1;
let seconds = 30;
let contFinish = 0;
let finishGame = false;
let changeCont = false;
let palabrasSinResponder = [];
const rosco = document.getElementById("ul");
const showTimer = document.getElementById("timer");

// ----------------------------------------------
//                    FUNCTIONS
// ----------------------------------------------

const checkAnswer = () => {
  if (finishGame === false) {
    const userAnswer = document.getElementById("answer").value;
    if (userAnswer !== "") {
      if (userAnswer.toLowerCase() === words[cont].palabra.toLowerCase()) {
        rosco.children[cont].classList.remove("item--noAnswer");
        rosco.children[cont].classList.remove("item--skip");
        rosco.children[cont].classList.add("item--success");
        score++;
      } else {
        rosco.children[cont].classList.remove("item--noAnswer");
        rosco.children[cont].classList.remove("item--skip");
        rosco.children[cont].classList.add("item--failure");
        score--;
      }
    }
    document.getElementById("score").innerHTML = `Score: ${score}`;
    checkCont();
  }
};

const skipWord = () => {
  if (finishGame === false) {
    rosco.children[cont].classList.remove("item--noAnswer");
    rosco.children[cont].classList.add("item--skip");
    checkCont();
  }
};

const showInfo = () => {
  rosco.children[cont].classList.add("parpadea");
  document.getElementById("word").innerHTML = `${words[cont].letra}`;
  document.getElementById("starts").innerHTML = `${
    words[cont].empieza === true
      ? "Empieza con " + words[cont].letra
      : "No empieza con " + words[cont].letra
  } `;
  document.getElementById("contains").innerHTML = `${
    words[cont].contiene === true
      ? "Contiene " + words[cont].letra
      : "No contiene " + words[cont].letra
  } `;
  document.getElementById(
    "description"
  ).innerHTML = `Descripcion: ${words[cont].descripcion}`;
};

const checkCont = () => {
  if (changeCont === true) {
    checkNoAnswer();
  } else {
    if (cont === rosco.children.length - 1) {
      rosco.children[cont].classList.remove("parpadea");
      checkFinishGame();
    } else {
      rosco.children[cont].classList.remove("parpadea");
      cont++;
      showInfo();
    }
  }
};

const checkNoAnswer = () => {
  if (aux === palabrasSinResponder.length - 1) {
    rosco.children[cont].classList.remove("parpadea");
    checkFinishGame();
  } else {
    rosco.children[cont].classList.remove("parpadea");
    aux++;
    cont = palabrasSinResponder[aux];
    showInfo();
  }
};

const checkFinishGame = () => {
  aux = 0;
  contFinish = 0;
  palabrasSinResponder = [];
  if (finishGame === false) {
    for (let i = 0; i < rosco.children.length; i++) {
      if (
        rosco.children[i].className === "item--success" ||
        rosco.children[i].className === "item--failure"
      ) {
        contFinish++;
      } else {
        if (
          rosco.children[i].className === "item--skip" ||
          rosco.children[i].className === ""
        ) {
          palabrasSinResponder.push(i);
        }
      }
    }
  }
  if (contFinish === rosco.children.length) {
    finishGame = true;
    clearInterval(timer);
    console.log("Termino");
  } else {
    changeCont = true;
    cont = palabrasSinResponder[aux];
    showInfo();
  }
};

var timer = setInterval(() => {
  if (minutes === 0 && seconds === 0) {
    finishGame = true;
    clearInterval(timer);
    showTimer.innerHTML = "Perdiste";
    rosco.children[cont].classList.remove("parpadea");
  } else {
    if (seconds === 0) {
      minutes = 0;
      seconds = 59;
    } else {
      seconds--;
    }
    showTimer.innerHTML = `Tiempo: ${minutes}:${seconds}`;
  }
}, 1000);

document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("skip").addEventListener("click", skipWord);

showInfo();
