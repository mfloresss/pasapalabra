import { words } from "./keyswords.js";

// ----------------------------------------------
//                    VARIABLES
// ----------------------------------------------

// TIMER
let timePassed = 0;
let timerInterval = 0;
let startGame = false;
const timeLimit = 300;
let timeLeft = timeLimit;
const alertThreshold = 10;
const fullDashArray = 283;
const warningThreshold = 20;

const colorCodes = {
  info: {
    color: "blue",
  },
  warning: {
    color: "yellow",
    threshold: warningThreshold,
  },
  alert: {
    color: "red",
    threshold: alertThreshold,
  },
};

let remainingPathColor = colorCodes.info.color;

// ROSCO
let aux = 0;
let cont = 0;
let text = "";
let backgroundColor = "";
let colorText = "";
let succes = 0;
let failure = 0;
let contFinish = 0;
let finishGame = false;
let changeCont = false;
let palabrasSinResponder = [];
const rosco = document.getElementById("ul");

// ----------------------------------------------
//                    Timer
// ----------------------------------------------

document.getElementById("base-timer-path-remaining").classList.add(remainingPathColor);
document.getElementById("timer-label").innerHTML = `${timeLeft}s`;

// Timer of 120 seconds with interval the one seconds
let startInterval = () => {
  if (startGame != true) {
    timerInterval = setInterval(() => {
      if (timeLeft === 0) {
        finishGame = true;
        rosco.children[cont].classList.remove("parpadea");
        clearInterval(timerInterval);
        leabelFinishGame(
          (text = "Se acabo el tiempo"),
          succes,
          failure,
          (colorText = ""),
          (backgroundColor = "rgba(255, 0, 0, 0.712)")
        );
      } else {
        if (finishGame === true) {
          clearInterval(timerInterval);
        } else {
          timePassed++;
          timeLeft = timeLimit - timePassed;
          document.getElementById("timer-label").innerHTML = `${timeLeft}s`;
          setCircleDasharray();
          setRemainingPathColor(timeLeft);
        }
      }
    }, 1000);
  }
  startGame = true;
};

// Set progressbar counter of the seconds
const setRemainingPathColor = (timeLeft) => {
  const { alert, warning, info } = colorCodes;
  if (timeLeft <= alert.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining").classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(info.color);
    document.getElementById("base-timer-path-remaining").classList.add(warning.color);
  }
};

const calculateTimeFraction = () => {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
};

const setCircleDasharray = () => {
  const circleDasharray = `${(calculateTimeFraction() * fullDashArray).toFixed(0)} 283`;
  document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
};

startInterval();

// ----------------------------------------------
//                    Rosco
// ----------------------------------------------

window.onload = () => {
  startGame = false;
  clearInterval(timerInterval);

  document.getElementById("start-game-label").style.display = "flex";
  document.getElementById("start-game-label").innerHTML = `
    <span id="title">¿Estas listo?</span>
    <button id="button-exit-label">Empezar juego</button>
  `;

  document.getElementById("button-exit-label").addEventListener("click", function exitShowCorrectWord() {
    document.getElementById("game").style.display = "flex";
    document.getElementById("start-game-label").style.display = "none";
    startInterval();
  });
}

// Check answer
const checkAnswer = () => {
  if (finishGame === false) {
    let userAnswer = document.getElementById("answer").value;
    document.getElementById("form").reset();
    if (userAnswer !== "") {
      if (userAnswer.toLowerCase() === words[cont].palabra.toLowerCase()) {
        rosco.children[cont].classList.remove("item--skip");
        rosco.children[cont].classList.add("item--success");
        succes++;
      } else {
        rosco.children[cont].classList.remove("item--skip");
        rosco.children[cont].classList.add("item--failure");
        failure++;
        if (cont === rosco.children.length - 1) {
          showCorrectWord();
        } else {
          showCorrectWord();
        }
      }
    }
    document.getElementById("succes-label").innerHTML = `${succes}`;
    document.getElementById("failure-label").innerHTML = `${failure}`;
    checkCont();
  }
};

// Skip word
const skipWord = () => {
  if (finishGame === false) {
    rosco.children[cont].classList.add("item--skip");
    checkCont();
  }
};

// Show information (current word and current description of the word)
const showInfo = () => {
  rosco.children[cont].classList.add("parpadea");
  document.getElementById("word").innerHTML = `${words[cont].letra}`;
  document.getElementById("description").innerHTML = `${words[cont].descripcion}`;
  if (words[cont].empieza === true) {
    document.getElementById("starts-or-contains").innerHTML = `Empieza con ${words[cont].letra}`;
  } else {
    if (words[cont].contiene === true) {
      document.getElementById("starts-or-contains").innerHTML = `Contiene ${words[cont].letra}`;
    } else {
      document.getElementById("starts-or-contains").innerHTML = `No contiene ni empieza con ${words[cont].letra}`;
    }
  }
};

//Show screen with correct word when wrong
const showCorrectWord = () => {
  startGame = false;
  clearInterval(timerInterval);

  document.getElementById("ocult-game").style.display = "none";
  document.getElementById("show-incorrect-word").style.display = "flex";
  document.getElementById("show-incorrect-word").style.backgroundColor = "rgba(255, 0, 0, 0.712)";

  document.getElementById("show-incorrect-word").innerHTML = `
    <span id="title">INCORRECTO</span>
    <span id="letra" class="parpadea">${words[cont].letra}</span>
    <span id="correct-word">La palabra correcta es: ${words[cont].palabra}</span>
    <span id="description-word">${words[cont].descripcion}</span>
    <button id="button-exit-label">Seguir jugando</button>
  `;

  document.getElementById("button-exit-label").addEventListener("click", function exitShowCorrectWord() {
    document.getElementById("show-incorrect-word").style.display = "none";
    if (finishGame != true) {
      document.getElementById("ocult-game").style.display = "block";
    }
    startInterval();
  });
};

// Show screen with correct word and missed words when game ends or timer expires
const leabelFinishGame = (text, succes, failure, colorText, backgroundColor) => {
  document.getElementById("ocult-game").style.display = "none";
  document.getElementById("show-label-finish-game").style.display = "flex";
  document.getElementById("show-label-finish-game").style.backgroundColor = backgroundColor;

  document.getElementById("show-label-finish-game").innerHTML = `
    <span id="title" style="color: ${colorText};">${text}</span>
    <span id="cant-word-correct" style="color: ${colorText};">Cantidad de palabras respondidas correctamente: ${succes}</span>
    <span id="cant-word-failure" style="color: ${colorText};">Cantidad de palabras no respondidas correctamente: ${failure}</span>
    <button id="new-game">Jugar denuevo</button>
  `;
  
  document.getElementById("new-game").addEventListener("click", function newGame() {
    location.reload();
  });
};

// Check counter
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

// Check counter for no answer or skip word
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

// Check finish game
const checkFinishGame = () => {
  aux = 0;
  contFinish = 0;
  palabrasSinResponder = [];

  if (finishGame === false) {
    for (let i = 0; i < rosco.children.length; i++) {
      if (rosco.children[i].className === "item--success" || rosco.children[i].className === "item--failure") {
        contFinish++;
      } else {
        if (rosco.children[i].className === "item--skip" || rosco.children[i].className === "") {
          palabrasSinResponder.push(i);
        }
      }
    }
  }

  if (contFinish === rosco.children.length) {
    finishGame = true;
    if (succes === rosco.children.length) {
      leabelFinishGame(
        (text = "Excelente, respondiste el 100% de las palabras correctamente"),
        succes,
        failure,
        (colorText = ""),
        (backgroundColor = "#74cc4bb6")
      );
    } else {
      leabelFinishGame(
        (text = "El juego termino"),
        succes,
        failure,
        (colorText = "black"),
        (backgroundColor = "#fff")
      );
    }
  } else {
    changeCont = true;
    cont = palabrasSinResponder[aux];
    showInfo();
  }
};

document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("skip").addEventListener("click", skipWord);

showInfo();
