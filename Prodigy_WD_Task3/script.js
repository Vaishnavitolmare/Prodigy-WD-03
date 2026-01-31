const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let mode = ""; // human or ai

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleClick));

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  statusText.textContent = mode === "ai"
    ? "Your turn (X) vs AI 🤖"
    : "Player X's turn";
}

function handleClick() {
  const index = this.dataset.index;

  if (!gameActive || gameState[index] !== "") return;

  makeMove(index, currentPlayer);

  if (checkWinner()) return;

  if (mode === "ai" && currentPlayer === "X") {
    setTimeout(aiMove, 500);
  } else {
    switchPlayer();
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  cells[index].textContent = player;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function aiMove() {
  let move = gameState.indexOf("");
  makeMove(move, "O");
  if (!checkWinner()) {
    currentPlayer = "X";
    statusText.textContent = "Your turn (X)";
  }
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a,b,c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusText.textContent = `${gameState[a]} wins! 🎉`;
      gameActive = false;
      return true;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return true;
  }

  return false;
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => cell.textContent = "");
}
