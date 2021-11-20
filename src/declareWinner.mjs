export default function declareWinner(gameOn, winnerdiv, mark, tracker, playerOne, playerTwo, oScore, xScore) {
    gameOn = false;
    winnerdiv.textContent = `${mark} wins!`;
    if (mark === playerOne.mark) {
      tracker = playerTwo.mark;
      playerOne.score++;
      xScore.textContent = playerOne.score;
    } else {
      tracker = playerOne.mark;
      playerTwo.score++;
      oScore.textContent = playerTwo.score;
    }
  }