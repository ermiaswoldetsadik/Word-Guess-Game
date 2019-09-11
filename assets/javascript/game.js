
function startGame() {


  maxguesses = 15;


  blanksAndSuccesses = [];


  wrongGuesses = [];


  selectedWord = bands[Math.floor(Math.random() * bands.length)];


  lettersInWord = selectedWord.split("");


  numBlanks = lettersInWord.length;

  for (var i = 0; i < numBlanks; i++) {
    if (lettersInWord[i] === " ") {
      blanksAndSuccesses.push("*");
    } else {
      blanksAndSuccesses.push("_");
    }
  }


  document.getElementById("guesses-left").innerHTML = "Number of Guesses: " + maxguesses;


  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");


  document.getElementById("wrong-guesses").innerHTML = "Wrong Guesses: " + wrongGuesses.join(" ");
}


function checkLetters(letter) {

  var letterInWord = false;


  for (var i = 0; i < numBlanks; i++) {

    if (selectedWord[i] === letter) {


      letterInWord = true;
    }
  }


  if (letterInWord) {


    for (var i = 0; i < numBlanks; i++) {


      if (selectedWord[i] === letter) {


        blanksAndSuccesses[i] = letter;
      }
    }


  }


  else {


    wrongGuesses.push(letter);


    maxguesses--;

  }

}


function roundComplete() {


  


  document.getElementById("guesses-left").innerHTML = "Guesses Left: " + maxguesses;


  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");


  document.getElementById("wrong-guesses").innerHTML = "Wrong Guesses: " + wrongGuesses.join(" ");


  if (lettersInWord.toString() === blanksAndSuccesses.toString()) {


    winCounter++;


    alert("You Win!");


    document.getElementById("win-counter").innerHTML = "Wins: " + winCounter;


    startGame();
  }


  else if (maxguesses === 0) {

    lossCounter++;


    alert("You Lose!");


    document.getElementById("loss-counter").innerHTML = "Losses: " + lossCounter;


    startGame();

  }

}


startGame();


document.onkeyup = function (event) {


  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuessed = event.key;

    if (wrongGuesses.indexOf(letterGuessed) !== -1) {
      alert("You already guessed that letter.");
      return;
    }


    checkLetters(letterGuessed);


    roundComplete();

  }

};

