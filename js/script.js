const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const displayGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide")
const word = "magnolia";

const dummyText = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");

};
dummyText(word);

guessButton.addEventListener("click", function(e){

    e.preventDefault();
    const letterInput = textInput.value;
    console.log(letterInput);
    letterInput.input = "";

});