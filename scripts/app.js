const playerFactory = (mark) => {
    const playerMark = mark;
    const cellIds = [];
    const score = 0;
    return { playerMark, cellIds, score };
}

const playerX = playerFactory("X");
const playerO = playerFactory("O");
const gameBoardCells = document.querySelectorAll(".cell");
const winnerdiv = document.getElementById("winner");
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
const winningRows = [["a1", "a2", "a3"], ["a1", "b2", "c3"], ["a1", "b1", "c1"], ["a2", "b2", "c2"], ["a3", "b2", "c1"], ["a3", "b3", "c3"], ["b1", "b2", "b3"], ["c1", "c2", "c3"]];
const ties = document.getElementById("ties");
const resetBtn = document.getElementById("reset");
let tieTracker = 0;
let tracker = playerO.playerMark;
let gameOn = true;


gameBoardCells.forEach(element => {
    const idOfCell = element.id;
    element.addEventListener("click", function () {
        if (element.textContent.length < 1 && gameOn == true) {
            if (tracker == playerO.playerMark) {
                this.append(playerX.playerMark);
                playerX.cellIds.push(idOfCell);
                tracker = playerX.playerMark;
                if (checkArrLengthForTie(playerO.cellIds, playerX.cellIds)) {
                    if (checkIfTie()) {
                        clearPlayerArrays();
                        clearBoard();
                    }
                }
                if (checkArrLengthForWin(playerO.cellIds, playerX.cellIds)) {
                    if (searchForWin(winningRows, playerX.cellIds)) {
                        declareWinner("X");
                        clearPlayerArrays();
                        clearBoard();
                    }
                }
            } else {
                playerO.cellIds.push(idOfCell);
                this.append(playerO.playerMark);
                tracker = playerO.playerMark;
                if (checkArrLengthForTie(playerO.cellIds, playerX.cellIds)) {
                    if (checkIfTie()) {
                        clearPlayerArrays();
                        clearBoard();
                    }
                }
                if (checkArrLengthForWin(playerO.cellIds, playerX.cellIds)) {
                    if (searchForWin(winningRows, playerO.cellIds)) {
                        declareWinner("O");
                        clearPlayerArrays();
                        clearBoard();
                    }
                }
            }
        }
    })
})

function clearBoard() {
    setTimeout(function () {
        gameOn = true;
        winnerdiv.textContent = "";
        gameBoardCells.forEach(element => {
            element.textContent = "";
        })
    }, 1000)
};

function declareWinner(mark) {
    gameOn = false;
    winnerdiv.textContent = `${mark} wins!`
    if (mark === "X") {
        winner = "X";
        playerX.score++;
        xScore.textContent = playerX.score;
    } else {
        winner = "O";
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

function isSubset(array1, array2) {
    return array2.every(function (element) {
        return array1.includes(element);
    });
}

function checkIfTie() {
    if (!searchForWin(winningRows, playerX.cellIds) && !searchForWin(winningRows, playerO.cellIds)) {
        winnerdiv.textContent = "It's a TIE!";
        gameOn = false;
        tieTracker++;
        ties.textContent = tieTracker;
        return true;
    }
}

function checkArrLengthForTie(arr1, arr2) {
    return arr1.length == 5 || arr2.length == 5
}

function checkArrLengthForWin(arr1, arr2) {
    return arr1.length >= 3 || arr2.length >= 3
}










