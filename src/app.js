import isSubset from "./isSubset.mjs";

const playerFactory = (mark) => {
  const playerMark = mark;
  const cellIds = [];
  const score = 0;
  return { playerMark, cellIds, score };
};

const startBtn = document.getElementById("start");
const anotherRoundBtn = document.getElementById("another-round");
const resetBtn = document.getElementById("reset");
const instructions = document.getElementById("instructions");
const gameBoard = document.getElementById("board-and-buttons");
const inGameInstructionsShow = document.getElementById(
  "instructions-ingame-show"
);
const inGameInstructionsHide = document.getElementById(
  "instructions-ingame-hide"
);

startBtn.addEventListener("click", game);
anotherRoundBtn.addEventListener("click", anotherRound);
resetBtn.addEventListener("click", reset);
inGameInstructionsShow.addEventListener("click", function () {
  inGameInstructionsShow.style.display = "none";
  instructions.style.display = "block";
  inGameInstructionsHide.style.display = "block";
});
inGameInstructionsHide.addEventListener("click", function () {
  inGameInstructionsShow.style.display = "block";
  instructions.style.display = "none";
  inGameInstructionsHide.style.display = "none";
});

const playerX = playerFactory("X");
const playerO = playerFactory("O");
const gameBoardCells = document.querySelectorAll(".cell");
const winnerdiv = document.getElementById("winner");
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
const winningRows = [
  ["a1", "a2", "a3"],
  ["a1", "b2", "c3"],
  ["a1", "b1", "c1"],
  ["a2", "b2", "c2"],
  ["a3", "b2", "c1"],
  ["a3", "b3", "c3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
];
const ties = document.getElementById("ties");
let tieTracker = 0;
let tracker = playerO.playerMark;
let gameOn = true;

function hideInstructions() {
  inGameInstructionsShow.style.display = "block";
  instructions.style.display = "none";
  startBtn.style.display = "none";
  gameBoard.style.display = "block";
}

function game() {
  hideInstructions();
  gameBoardCells.forEach((element) => {
    const idOfCell = element.id;
    element.addEventListener("click", function () {
      if (element.textContent.length < 1 && gameOn) {
        if (tracker == playerO.playerMark) {
          this.append(playerX.playerMark);
          playerX.cellIds.push(idOfCell);
          tracker = playerX.playerMark;
          if (checkArrLengthForTie(playerO.cellIds, playerX.cellIds)) {
            if (checkIfTie()) {
              anotherRoundBtn.style.display = "block";
              clearPlayerArrays();
            }
          }
          if (checkArrLengthForWin(playerO.cellIds, playerX.cellIds)) {
            if (searchForWin(winningRows, playerX.cellIds)) {
              anotherRoundBtn.style.display = "block";
              declareWinner("X");
              clearPlayerArrays();
            }
          }
        } else {
          playerO.cellIds.push(idOfCell);
          this.append(playerO.playerMark);
          tracker = playerO.playerMark;
          if (checkArrLengthForTie(playerO.cellIds, playerX.cellIds)) {
            if (checkIfTie()) {
              anotherRoundBtn.style.display = "block";
              clearPlayerArrays();
            }
          }
          if (checkArrLengthForWin(playerO.cellIds, playerX.cellIds)) {
            if (searchForWin(winningRows, playerO.cellIds)) {
              anotherRoundBtn.style.display = "block";
              declareWinner("O");
              clearPlayerArrays();
            }
          }
        }
      }
    });
  });
}

function anotherRound() {
  anotherRoundBtn.style.display = "none";
  clearBoard();
  winnerdiv.textContent = "";
  game();
  gameOn = true;
}

function clearBoard() {
  gameBoardCells.forEach((element) => {
    element.textContent = "";
  });
}

function reset() {
  clearPlayerArrays();
  clearBoard();
  gameBoard.style.display = "none";
  instructions.style.display = "initial";
  startBtn.style.display = "initial";
  playerO.score = 0;
  playerX.score = 0;
  xScore.textContent = 0;
  oScore.textContent = 0;
  tieTracker = 0;
  ties.textContent = 0;
  winnerdiv.textContent = "";
  gameOn = true;
  inGameInstructionsHide.style.display = "none";
  inGameInstructionsShow.style.display = "none";
  anotherRoundBtn.style.display = "none";
}

function declareWinner(mark) {
  gameOn = false;
  winnerdiv.textContent = `${mark} wins!`;
  if (mark === "X") {
    tracker = "O";
    playerX.score++;
    xScore.textContent = playerX.score;
  } else {
    tracker = "X";
    playerO.score++;
    oScore.textContent = playerO.score;
  }
}

function clearPlayerArrays() {
  playerX.cellIds = [];
  playerO.cellIds = [];
}

function searchForWin(arr1, arr2) {
  let result;
  for (let i = 0; i < arr1.length; i++) {
    if (isSubset(arr2, arr1[i])) {
      result = true;
    }
  }
  return result;
}

function checkIfTie() {
  if (
    !searchForWin(winningRows, playerX.cellIds) &&
    !searchForWin(winningRows, playerO.cellIds)
  ) {
    winnerdiv.textContent = "It's a TIE!";
    tracker = "O";
    gameOn = false;
    tieTracker++;
    ties.textContent = tieTracker;
    return true;
  }
}

function checkArrLengthForTie(arr1, arr2) {
  return arr1.length == 5 || arr2.length == 5;
}

function checkArrLengthForWin(arr1, arr2) {
  return arr1.length >= 3 || arr2.length >= 3;
}
