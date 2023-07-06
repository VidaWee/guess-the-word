const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const displayGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide")
const word = "magnolia";
const AllGuessedLetters = [];

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
    message.innerText = "";
    const letterInput = textInput.value;
    const goodGuess = validateInput(letterInput);
    textInput.value = "";

    if (goodGuess) {
    
      makeGuess(letterInput);
    }
    letterInput.value = "";
});


const validateInput = function(input){
  const acceptedLetter = /[a-zA-Z]/
  if (input.length === 0){
    message.innerText = "Please enter a letter.";
  } else if (input.length>1){
    message.innerText = "Please enter a single letter.";    
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  }else{
  return input;
  }
};

const makeGuess = function(guess){

  guess=guess.toUpperCase();

  if(AllGuessedLetters.includes(guess)){

    message.innerText ="Already guessed the letter please try again!";
  }else{
    AllGuessedLetters.push(guess)
    console.log(AllGuessedLetters);
  }

};
