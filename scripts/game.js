var wordToGuess; //This variable is, as you guessed it, the word that our player will need to guess..

var tries = 0; //This variable is used to check how many time our player picked a wrong letter
var difficulty = 1; //NEEDED to be between 1 and 3

var revealedLetters = new Array(); 

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TRIES_TO_LOSE = 6;
const HIDDEN_LETTER_CHAR = "*";

function InitGame() {
  //Collect a random word from our dictionary.
  wordToGuess = dictionnaire[Math.floor(Math.random() * dictionnaire.length)];
  //Set our revealed letters by default depending on the game's difficulty..
  BuildDefaultGuess();

  //Then, we build our keyboard and disable the revealed letters by default.
  updateKeyboard();

  UpdateUI();
}

function updateKeyboard() {
  //We first need to remove all the keys from our virtual keyboard.
  const KeyboardParent = document.getElementById("VirtualKeyboard");
  KeyboardParent.innerHTML = "";
  //We then add a new key for each letter of the alphabet.
  for (var i = 0; i < ALPHABET.length; i++) {
    var newKey = document.createElement("button");
    newKey.innerText = ALPHABET[i];
    newKey.onclick = function (e) {
      return Event_GuessNewLetter(e);
    };
    for (revealed in revealedLetters) {
      //We also need to check if the target letter of our key is revealed to disable it.
      if (revealedLetters[revealed] == ALPHABET[i]) {
        newKey.className = "disabled";
        break;
      }
    }
    KeyboardParent.appendChild(newKey);
  }
}

function BuildDefaultGuess() {
  //We create an array of characters from our final word.
  var wordLetters = wordToGuess.toString().split("");

  //To avoid duplicate characters, We create a second array with filtered letters.
  var containedLetters = wordLetters.filter(
    (item, index) => wordLetters.indexOf(item) === index
  );

  //Calculate the number of letters we should reveal based on the length of the word and the difficulty of the game.
  var revealPercentage = Math.floor(wordLetters.length / difficulty / 2);

  //Pick up letters from our word based on revealPercentage value to add them to our revealedLetters array...
  for (var i = 0; i < revealPercentage; i++) {
    revealedLetters.push(
      containedLetters[Math.floor(Math.random() * containedLetters.length)]
    );
  }

  //We also check if our final word contains special characters, and if it does, we forcefully add them to our revealed letters.
  for (letter in wordLetters) {
    if (!ALPHABET.includes(wordLetters[letter])) {
      revealedLetters.push(wordLetters[letter]);
    }
  }

  //Then, we filter our array to once again prevent duplicated characters.
  revealedLetters = revealedLetters.filter(
    (item, index) => revealedLetters.indexOf(item) === index
  );

  if (revealedLetters.length < 1) {
    revealedLetters.push(wordLetters[0]);
  }
}

function UpdateUI() {
  //Our initial step is to create a new empty variable that will store our new 'censored' word.
  var newString = "";
  //Then, we check for any revealed letters in our final word.
  for (letter in wordToGuess) {
    var letterFound = false;
    for (revealed in revealedLetters) {
      if (wordToGuess[letter] == revealedLetters[revealed]) {
        letterFound = true;
        break;
      }
    }
    //If an revealed letter is found, we display it as a character. If not, we display our hidden character's constant value.
    if (!letterFound) {
      newString += HIDDEN_LETTER_CHAR;
    } else {
      newString += wordToGuess[letter];
    }
  }
  document.getElementById("WordToGuess").innerHTML = newString;
}

function isLetterInWord(letter) {
  var currentGuess = document.getElementById("WordToGuess").innerHTML;
  if (wordToGuess.includes(letter)) {
    if (currentGuess == wordToGuess) {
      Event_Won();
    }
  } else {
    //if the last letter pressed by our player if not in our final word, we increment our "tries" variable and we increase the red value of our background while updating the "pendu" picture
    tries++;
    document.getElementById("pendu").src = "resources/p" + tries + ".png";
    document.body.style.backgroundColor = "rgb(255," + (255 - tries * 42.5) + "," + (255 - tries * 42.5) + ")";
    //Then, we check if the player has made too many attempts to continue playing, aka check if the player loses the game.
    if (tries >= TRIES_TO_LOSE) {
      //if it's the case, we can call our lose event..
      tries = TRIES_TO_LOSE;
      Event_Lose();
    }
  }
}
