const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining");
const displayGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide")


let word = "magnolia";
const AllGuessedLetters = [];
let remainingGuesses= 8;

const getWord = async function(){

  const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await res.text();
  //console.log(data);
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();

  dummyText(word);
 
};

getWord();

// display symbol as placeholder

const dummyText = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
      //console.log(letter);
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
    updateRemainingGuess(guess);
    displayGuessedLetters();
    wordInProgress(AllGuessedLetters);
   

  }

};
//Function to show guessed letters
const displayGuessedLetters= function(){
  guessedLetters.innerHTML = "";
  for(const letter of AllGuessedLetters){
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
  }
};

//Fuction toupdate the Word in Progress

const wordInProgress = function(AllGuessedLetters){
  const wordUpper = word.toUpperCase(); // word to uppercase
  const wordArray = wordUpper.split(""); // split the const revealWord = [];
  const revealWord = [];
  for (const letter of wordArray) {
    if (AllGuessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }

  wordProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateRemainingGuess = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess))  {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    displayGuessSpan.innerText = `${remainingGuesses} guess`;
  } else {
    displayGuessSpan.innerText = `${remainingGuesses} guesses`;
  }
};
  


const checkIfWin = function () {
  if (word.toUpperCase() === wordProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};

