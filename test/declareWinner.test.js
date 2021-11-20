import declareWinner from "../src/declareWinner.mjs";
import playerFactory from "../src/playerFactory.mjs";


// test("what should happen", () => {
    // expect(declareWinner(arguments).toBe(e.g. true/false))
// });

test("when declareWinner is called, gameOn should be false", () => {
    let playerOne = playerFactory("X");
    let playerTwo = playerFactory("O");
    declareWinner(true, {}, "X", "", playerOne, playerTwo, {}, {})
    expect(playerOne.score).toBe(1)
    declareWinner(true, {}, "O", "", playerOne, playerTwo, {}, {})
    expect(playerTwo.score).toBe(1)
});

// test("winnerdiv textContent should be 'X wins!' or 'O wins'", () => {
//     expect(declareWinner(gameOn, winnerdiv, "X", tracker, playerOne, playerTwo).toBe(winnerdiv.textContent === "X wins!"))
// });

// test("winnerdiv textContent should be 'X wins!' or 'O wins'", () => {
//     expect(declareWinner(gameOn, winnerdiv, "O", tracker, playerOne, playerTwo).toBe(winnerdiv.textContent === "O wins!"))
// });

// test("if mark is playerOne mark (X) tracker should be set to playerTwo mark", () => {
//     expect(declareWinner(gameOn, winnerdiv, "X", tracker, playerOne, playerTwo).toBe(tracker === "O"))
// });

// test("if mark is playerTwo mark (O) tracker should be set to playerOne mark", () => {
//     expect(declareWinner(gameOn, winnerdiv, "O", tracker, playerOne, playerTwo).toBe(tracker === "X"))
// });


