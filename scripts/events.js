function Event_Loaded() {
    //when the page is loaded, we can initialize the game..
    InitGame();
}

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

function Event_UpdateDifficulty(diffiulty) {
    difficulty = document.getElementById("difficulty").value;
    Event_newWord();
}

function Event_GuessNewLetter(letter) {
    var targetLetter = letter.srcElement.innerHTML;
    revealedLetters.push(targetLetter);
    UpdateUI();
    isLetterInWord(targetLetter)
    updateKeyboard();
}

function Event_Lose() {
    document.getElementById("VirtualKeyboard").style.pointerEvents = "none";
    document.getElementById("message").innerHTML = "Perdu ! <br>Le mot était : <b>" + wordToGuess + "</b><br>Clique ici pour re-jouer";
    document.getElementById("message").style.visibility = "visible"
}

function Event_Won() {
    document.getElementById("VirtualKeyboard").style.pointerEvents = "none";
    document.getElementById("message").innerHTML = "Bien joué ! <br>Tu as trouvé en <b>"+tries+"</b> essais!<br>Clique ici pour re-jouer";
    document.body.style.backgroundColor = "rgb(0,125,0)"
    document.getElementById("message").style.visibility = "visible"
}