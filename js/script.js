let guessWord = "";
let userInput = [];
let wordStatus = null;
let wrongTries = 0;
const totalTries = 6;

const wordsArr = [
    'hiphop',
    'jazz',
    'disco',
    'techno',
    'reggae',
    'rock'
];

function randomWord() {
    guessWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
}

function keyboardLetters() {
    let buttons = "abcdefghijklmnopqrstuvwxyz"
        .split("")                                  
        .map(letter =>
        `<button  
        class="btn"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById("keyboard").innerHTML = buttons;
}

function handleGuess(chosenLetter) {
    userInput.indexOf(chosenLetter) === -1 ? userInput.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute("disabled", true);

    if (guessWord.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    }
    else if (guessWord.indexOf(chosenLetter) === -1) {
        wrongTries++;
        updateMistake();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById("hangmanPic").src = "./images/" + wrongTries + ".svg";
}

function checkIfGameWon() {
    if (wordStatus === guessWord) {
        document.getElementById("wordSpotlight").innerHTML = "Congratulations!";
        document.getElementById("keyboard").innerHTML = "You won :)";
    }
}

function checkIfGameLost() {
    if (wrongTries === totalTries) {
        let capitalizeLetter = guessWord.charAt(0).toUpperCase() + guessWord.slice(1).toLowerCase();
        guessWord = capitalizeLetter;
        
        document.getElementById("wordSpotlight").innerHTML = "You lost :(";
        document.getElementById("keyboard").innerHTML = "The correct word was: " + guessWord;;
    }
}

function guessedWord() {
    wordStatus = guessWord.split("").map(letter => (userInput.indexOf(letter) >= 0 ? letter : " _ ")).join("");
    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function updateMistake() {
    document.getElementById("wrong_tries").innerHTML = wrongTries;
}

function reset() {
    wrongTries = 0;
    userInput = [];
    document.getElementById("hangmanPic").src = "./images/0.svg";

    randomWord();
    guessedWord();
    updateMistake();
    keyboardLetters();
}

randomWord();
keyboardLetters();
guessedWord();

document.getElementById("total_tries").innerHTML = totalTries;

document.getElementById("wrong_tries").innerHTML = wrongTries;