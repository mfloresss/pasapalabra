import { finishGame } from "./keyswords.js";

document.getElementById(
  "score"
).innerHTML = `Puntuacion: ${finishGame.puntuacion}`;
document.getElementById("time").innerHTML = `Tiempo: ${finishGame.tiempo}`;

// console.log(finishGame.puntuacion)

// const number = 10;
// const pepe = true;

// let finishGame = {
//   puntuacion: 0,
//   tiempo: 0,
//   palabrasRespondidas: 0,
//   palabrasNoRespondidas: 0,
// };

// finishGame.puntuacion = number;
// finishGame.tiempo = number;
// finishGame.palabrasRespondidas = number;
// finishGame.palabrasNoRespondidas = number;

// console.log(finishGame);
