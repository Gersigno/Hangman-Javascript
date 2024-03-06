/**
 * This function is called when our html's body is fully loaded,
 * it will trigger the "InitGame()" function
 */
function Event_Loaded() {
    //when the page is loaded, we can initialize the game..
    InitGame();
}

/**
 * This function will restart our game and pick up a new random word from our dictionary.
 */
function Event_newWord() {
    updateKeyboard();
    wordToGuess = "";
    revealedLetters = [];
    tries = 0;
    document.getElementById("pendu").src = "resources/p"+tries+".png";
    document.body.style.backgroundColor = "rgb(227,227,227)"
    document.getElementById("VirtualKeyboard").style.pointerEvents = "all";
    InitGame();
    document.getElementById("message").innerHTML = "";
    document.getElementById("message").style.visibility = "collapse"
}

/**
 * Adjust the game's difficulty by selecting the value of the difficulty drop down menu.
 */
function Event_UpdateDifficulty() {
    difficulty = document.getElementById("difficulty").value;
    Event_newWord();
}

/**
 * Called by our keyboard's button on click events.
 * @param {*} letter button's letter (pass it as an "this" reference from the onclick event)
 */
function Event_GuessNewLetter(letter) {
    //First, obtain the inner letter of our button..
    var targetLetter = letter.innerHTML;
    //then, push it into our revealed letters array.
    revealedLetters.push(targetLetter);
    UpdateUI();
    isLetterInWord(targetLetter)
    updateKeyboard();
}

/**
 * Event called when the player loses/runs out of attempts.
 */
function Event_Lose() {
    document.getElementById("VirtualKeyboard").style.pointerEvents = "none";
    document.getElementById("message").innerHTML = "Perdu ! <br>Le mot était : <b>" + wordToGuess + "</b><br>Clique ici pour re-jouer";
    document.getElementById("message").style.visibility = "visible"
}

/**
 * Event called when the player has guessed successfully our secret word
 */
function Event_Won() {
    document.getElementById("VirtualKeyboard").style.pointerEvents = "none";
    document.getElementById("message").innerHTML = "Bien joué ! <br>Tu as trouvé en <b>"+tries+"</b> essais!<br>Clique ici pour re-jouer";
    document.body.style.backgroundColor = "rgb(0,125,0)"
    document.getElementById("message").style.visibility = "visible"
}