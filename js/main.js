import { words } from "./keyswords.js";

// ----------------------------------------------
//                    VARIABLES
// ----------------------------------------------

let cont = 0;
let pepito = false;
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
      score++;
    } else {
      rosco.children[cont].classList.add("item--failure");
      palabrasSinResponder.push(cont);
      score--;
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
  if (cont === rosco.children.length - 1) {
    pepito = true;
    rosco.children[cont].classList.remove("parpadea");
    checkFinishGame();
  } else {
    rosco.children[cont].classList.remove("parpadea");
    cont++;
    showInfo();
  }
};

const checkFinishGame = () => {
  let succes = 0;
  for (let i = 0; i < rosco.children.length - 1; i++) {
    if (rosco.children[i].className === "item--success") {
      succes++;
      if (succes === rosco.children.length - 1) {
        score = 0;
        clearInterval(timer);
      }
    }
  }
};

const checkNoAnswer = () => {
  cont = palabrasSinResponder[0];
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
