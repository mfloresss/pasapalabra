import { finishGame } from "./keyswords.js";

document.getElementById(
  "score"
).innerHTML = `Puntuacion: ${finishGame.puntuacion}`;
document.getElementById("time").innerHTML = `Tiempo: ${finishGame.tiempo}`;

console.log(finishGame.puntuacion)
