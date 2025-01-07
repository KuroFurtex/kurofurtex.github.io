// Function to show the "How to Play" menu
function showHowToPlay() {
    document.getElementById("menuOptions").style.display = "none";
    document.getElementById("howToPlayMenu").style.display = "block";
    sound.play('change');
}

// Function to show the "Options" menu
function showOptions() {
    document.getElementById("menuOptions").style.display = "none";
    document.getElementById("optionsMenu").style.display = "block";
    sound.play('change');
}

// Function to go back to the main menu
function goToMainMenu() {
    document.getElementById("menuOptions").style.display = "block";
    document.getElementById("howToPlayMenu").style.display = "none";
    document.getElementById("optionsMenu").style.display = "none";
    document.getElementById("artistList").style.display = "none";
    sound.play('change');
}

function chooseArtist() {
    document.getElementById("menuOptions").style.display = "none";
    document.getElementById("artistList").style.display = "block";
    sound.play('change');
}