var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
	 pickPaper = document.getElementById('js-playerPick_paper'),
	 pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted':
		default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  info_kto_wygral.innerHTML = "";
  if (player.name) {
	  player.score = computer.score = 0;
	  setGameElements();
    gameState = 'started';
	  
	  playerNameElem.innerHTML = player.name;
	  setGamePoints();
  }

}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

// Tutaj jako wybór gracza ustawiony jest indeks tablicy

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
	// parametr playerPick odnosi się do linii 9 - 11
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	
	checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = ''; //usuwamy wyświetlany tekst, nie wiemy przecież kto wygrał bo to początek

	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // remis
    } else if (
		 (computerPick == 'rock' &&  playerPick == 'scissors') ||
		 (computerPick == 'scissors' &&  playerPick == 'paper') ||
		 (computerPick == 'paper' &&  playerPick == 'rock')) {

		winnerIs = 'computer';
    }

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Win!";
		player.score++;
		setGamePoints();
    } else if (winnerIs == 'computer') {
		 computerResultElem.innerHTML = "Win!";
		 computer.score++;
		 setGamePoints();
    }
  sprawdzczyktoswygral(); 
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function sprawdzczyktoswygral() {
    //jesli ktos osiagnal 10 pkt to wygrywa
    if (player.score === 10) {
        console.log("Player wins");
      info_kto_wygral.innerHTML = "Player wins!!!";
        gameState = "ended";
        setGameElements();
    } else if (computer.score === 10) {
        console.log("Computer wins");
      info_kto_wygral.innerHTML = "Computer wins!!!";
        gameState = "ended";
        setGameElements();
    } 
}
