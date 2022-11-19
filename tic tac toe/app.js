const editButton1 = document.getElementById("editbutton1");
const editButton2 = document.getElementById("editbutton2");
const nameCustomisationBox = document.getElementById("playercustomisationbox");
const backdrop = document.getElementById("backdrop");
const resetInputButton = document.getElementById("resetinputbtn");
const submitDataButton = document.getElementById("submitinputbtn");
const formElement = document.querySelector("form");
const formInput = document.getElementById("playername");

const activeGame = document.getElementById("activegame");
const activePlayerName = document.getElementById("activeplayer");
const startElement = document.getElementById("startgame");
const gameField = document.getElementById("gamefield");
const gameOverElement = document.getElementById("gameover");

const gameMatrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameOver = false;

editButton1.addEventListener("click", editPlayerName);
editButton2.addEventListener("click", editPlayerName);

backdrop.addEventListener("click", closeEditingWindow);
resetInputButton.addEventListener("click", closeEditingWindow);

formElement.addEventListener("submit", submitPlayerName);

gameField.addEventListener("click", selectGameField);
startElement.addEventListener("click", startNewGame);

function editPlayerName(event) {
  editedPlayer = +event.target.dataset.playerid;
  nameCustomisationBox.style.display = "block";
  backdrop.style.display = "block";
  console.log(editedPlayer);
}

function closeEditingWindow() {
  formInput.value = "";
  nameCustomisationBox.style.display = "none";
  backdrop.style.display = "none";
  nameCustomisationBox.children[1].lastElementChild.value = "";
}

function submitPlayerName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("playername").trim();
  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  players[editedPlayer - 1].name = enteredPlayername;
  closeEditingWindow();
}

function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
  "You have won, <span id='winnername'>PLAYER NAME</span>! Start over by pressing 'Start New Game'!"
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameMatrix[i][j] = 0;
      const gameFieldItem = gameField.children[gameBoardIndex];
      gameFieldItem.textContent = "";
      gameFieldItem.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function startNewGame() {
  resetGame();
  activePlayerName.textContent = players[activePlayer].name;
  activeGame.style.display = "block";
}

function selectGameField(event) {
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameMatrix[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameMatrix[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkEnd();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkEnd() {
  for (var i = 0; i < 3; i++) {
    if (
      gameMatrix[i][0] > 0 &&
      gameMatrix[i][0] === gameMatrix[i][1] &&
      gameMatrix[i][1] === gameMatrix[i][2]
    ) {
      return gameMatrix[i][0];
    }
  }
  for (var i = 0; i < 3; i++) {
    if (
      gameMatrix[0][i] > 0 &&
      gameMatrix[0][i] === gameMatrix[1][i] &&
      gameMatrix[1][i] === gameMatrix[2][i]
    ) {
      return gameMatrix[0][i];
    }
  }
  if (
    gameMatrix[0][0] > 0 &&
    gameMatrix[0][0] === gameMatrix[1][1] &&
    gameMatrix[1][1] === gameMatrix[2][2]
  ) {
    return gameMatrix[0][0];
  }
  if (
    gameMatrix[2][0] > 0 &&
    gameMatrix[2][0] === gameMatrix[1][1] &&
    gameMatrix[0][2] === gameMatrix[1][1]
  ) {
    return gameMatrix[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameOver = true;
  gameOverElement.style.display = "flex";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
  activeGame.style.display = "none";
}
