import { words } from "./keyswords.js";

// ----------------------------------------------
//                    VARIABLES
// ----------------------------------------------

let cont = 0;
let score = 0;
let seconds = 1;
let minutes = 0;
let palabrasSinResponder = [];
const rosco = document.getElementById("ul");
const showTimer = document.getElementById("timer");

// ----------------------------------------------
//                    FUNCIONES
// ----------------------------------------------

const checkAnswer = () => {
  const userAnswer = document.getElementById("answer").value;
  if (userAnswer === "") {
    rosco.children[cont].classList.add("item--noAnswer");
    palabrasSinResponder.push(cont);
  } else {
    if (userAnswer.toLowerCase() === words[cont].palabra.toLowerCase()) {
      rosco.children[cont].classList.add("item--success");
      rosco.children[cont].classList.remove("item--noAnswer");
      rosco.children[cont].classList.remove("item--failure");
      rosco.children[cont].classList.remove("item--skip");
      score += 5;
    } else {
      rosco.children[cont].classList.add("item--failure");
      palabrasSinResponder.push(cont);
      score -= 5;
    }
  }
  document.getElementById("score").innerHTML = `Score: ${score}`;
  checkCont();
};

const skipWord = () => {
  rosco.children[cont].classList.add("item--skip");
  palabrasSinResponder.push(cont);
  checkCont();
};

const showInfo = () => {
  rosco.children[cont].classList.add("parpadea");
  document.getElementById("word").innerHTML = `${words[cont].letra}`;
  if (words[cont].empieza === true) {
    document.getElementById(
      "starts"
    ).innerHTML = `Empieza con ${words[cont].letra}`;
  } else {
    document.getElementById(
      "starts"
    ).innerHTML = `No empieza con ${words[cont].letra}`;
  }
  document.getElementById(
    "description"
  ).innerHTML = `Descripcion: ${words[cont].descripcion}`;
  if (words[cont].contiene === true) {
    document.getElementById(
      "contains"
    ).innerHTML = `Contiene ${words[cont].letra}`;
  } else {
    document.getElementById(
      "contains"
    ).innerHTML = `No contiene ${words[cont].letra}`;
  }
};

const checkCont = () => {
  if (cont === rosco.children.length - 1) {
    rosco.children[cont].classList.remove("parpadea");
    finishGame();
    showInfo();
  } else {
    cont++;
    rosco.children[cont - 1].classList.remove("parpadea");
    showInfo();
  }
};

const finishGame = () => {
  for (let i = 0; i < rosco.children.length - 1; i++) {
    if (rosco.children[i].getElementsByClassName === "item--success") {
      cont = 0;
      score = 0;
      clearInterval(timer);
      document.getElementById("finish-game").classList.add("pepepepepe");
    } else {
      cont = palabrasSinResponder[0];
    }
  }
};

var timer = setInterval(() => {
  showTimer.innerHTML = `Tiempo: ${minutes}:${seconds}`;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  } else {
    seconds++;
  }
  if (minutes === 1 && seconds === 30) {
    showTimer.innerHTML = "Perdiste";
    clearInterval(timer);
  }
}, 1000);

document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("skip").addEventListener("click", skipWord);

showInfo();
