import { words } from "./keyswords.js";

// ----------------------------------------------
//                    VARIABLES
// ----------------------------------------------

let aux = 0;
let cont = 0;
let score = 0;
let succes = 0;
let failure = 0;
let minutes = 1;
let seconds = 30;
let gano = false;
let perdio = false;
let changeCont = false;
let palabrasSinResponder = [];
const rosco = document.getElementById("ul");
const showTimer = document.getElementById("timer");

// ----------------------------------------------
//                    FUNCTIONS
// ----------------------------------------------

const checkAnswer = () => {
  if ((gano || perdio) === false) {
    const userAnswer = document.getElementById("answer").value;
    if (userAnswer === "") {
      rosco.children[cont].classList.add("item--noAnswer");
    } else {
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
  rosco.children[cont].classList.add("item--skip");
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
    aux = 0;
    checkFinishGame();
  } else {
    rosco.children[cont].classList.remove("parpadea");
    aux++;
    cont = palabrasSinResponder[aux];
    showInfo();
  }
};

const checkFinishGame = () => {
  succes = 0;
  failure = 0;
  palabrasSinResponder = [];
  if ((gano || perdio) === false) {
    for (let i = 0; i < rosco.children.length; i++) {
      if (rosco.children[i].className === "item--success") {
        succes++;
      } else {
        if (rosco.children[i].className === "item--failure") {
          failure++;
        } else {
          if (
            rosco.children[i].className === "item--skip" ||
            "item--noAnswer"
          ) {
            palabrasSinResponder.push(i);
          }
        }
      }
    }
  }
  if (succes === rosco.children.length) {
    gano = true;
    clearInterval(timer);
    console.log("ganaste");
  } else {
    if (failure === rosco.children.length) {
      perdio = true;
      clearInterval(timer);
      console.log("perdiste");
    } else {
      changeCont = true;
      cont = palabrasSinResponder[aux];
      showInfo();
    }
  }
};

var timer = setInterval(() => {
  showTimer.innerHTML = `Tiempo: ${minutes}:${seconds}`;
  if (seconds === 0) {
    minutes = 0;
    seconds = 60;
  } else {
    seconds--;
  }
  if (minutes === 0 && seconds === 0) {
    showTimer.innerHTML = "Perdiste";
    clearInterval(timer);
  }
}, 1000);

document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("skip").addEventListener("click", skipWord);

showInfo();
