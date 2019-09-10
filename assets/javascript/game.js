
// FUNCTIONS
// =======================================================

// startGame() will start and restart game
function startGame() {

  // Reset guesses back to 15
  numGuesses = 15;

  // Reset the "guess and success" array at each round
  blanksAndSuccesses = [];

  // Reset wrong guesses from previous round
  wrongGuesses = [];

  // Solution chosen randomly from bands
  selectedWord = bands[Math.floor(Math.random() * bands.length)];

  // Breaks solution word into individual letters
  lettersInWord = selectedWord.split("");

  // Counts the number of letters in the word
  numBlanks = lettersInWord.length;

  // Print solution in console (for testing)
  console.log(selectedWord);

  // Fill "blanksAndSuccesses" list with appropriate number of blanks, based on number of letters in solution word
  for (var i = 0; i < numBlanks; i++) {
    if (lettersInWord[i] === " ") {
      blanksAndSuccesses.push("*");
    } else {
      blanksAndSuccesses.push("_");
    }
  }

  // Print initial blanks in console
  console.log(blanksAndSuccesses);

  // Reprint the guessesLeft to 15
  document.getElementById("guesses-left").innerHTML = "Number of Guesses: " + numGuesses;

  // Prints blanks at beginning of each round in HTML
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");

  // Clears wrong guesses from previous round
  document.getElementById("wrong-guesses").innerHTML = "Wrong Guesses: " + wrongGuesses.join(" ");
}

// checkLetters() function - holds all comparisons for matches
function checkLetters(letter) {

  // Boolean will be toggled based on if user's letter is found anywhere in the word
  var letterInWord = false;

  // Checks if letter exists inside the array at all
  for (var i = 0; i < numBlanks; i++) {

    if (selectedWord[i] === letter) {

      // If letter exists, then toggle boolean to true, used in next step
      letterInWord = true;
    }
  }

  // If letter exists somewhere in word, figure out exactly where (which indices)
  if (letterInWord) {

    // Loop through the word
    for (var i = 0; i < numBlanks; i++) {

      // Populate blanksAndSuccesses with every instance of the letter
      if (selectedWord[i] === letter) {

        // Set specific blank space(s) to equal correct letter when there is a match
        blanksAndSuccesses[i] = letter;
      }
    }

    // Log current blanks and successes for testing
    console.log(blanksAndSuccesses);
  }

  // If letter doesn't exist at all...
  else {

    // Add letter to list of wrong letters
    wrongGuesses.push(letter);

    // Also subtract one of the guesses
    numGuesses--;

  }

}

// roundComplete() function - will run necessary code after each guess is made
function roundComplete() {

  // Log initial status in console re: how many wins, losses, and guesses are left
  console.log("Win Count: " + winCounter + " | Loss Count: " + lossCounter + " | Num Guesses: " + numGuesses);

  // HTML UPDATES
  // ============

  // Update HTML to reflect new number of guesses
  document.getElementById("guesses-left").innerHTML = "Guesses Left: " + numGuesses;

  // Print array of guesses and blanks onto page
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");

  // Print wrong guesses to page
  document.getElementById("wrong-guesses").innerHTML = "Wrong Guesses: " + wrongGuesses.join(" ");

  // If word guess string equals solution
  if (lettersInWord.toString() === blanksAndSuccesses.toString()) {

    // Add to the win counter
    winCounter++;

    // Give user "win" alert
    alert("You Win!");

    // Update win counter in HTML
    document.getElementById("win-counter").innerHTML = "Wins: " + winCounter;

    // Restart game
    startGame();
  }

  // if user has run out of guesses
  else if (numGuesses === 0) {
    // Add to loss counter
    lossCounter++;

    // Give user "lose" alert
    alert("You Lose!");

    // Update loss counter in HTML
    document.getElementById("loss-counter").innerHTML = "Losses: " + lossCounter;

    // Restart game
    startGame();

  }

}

// MAIN PROCESS
// =======================================================

// Starts game
startGame();

// Then initiates function for capturing key clicks
document.onkeyup = function (event) {

  // captures keypress, eliminating repeat letters
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuessed = event.key;

    if (wrongGuesses.indexOf(letterGuessed) !== -1) {
      alert("You already guessed that letter.");
      return;
    }

    // Runs code to check for correct guesses
    checkLetters(letterGuessed);

    // Runs code that ends each round
    roundComplete();

  }

};

