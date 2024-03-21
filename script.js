let numberOfPlayers;
let player1Name, player2Name;
let maxRounds;
let currentRound = 1;

function selectPlayers(num) {
  const picsDiv = document.getElementById("pics");
  const pics2Div = document.getElementById("pics2");
  picsDiv.innerHTML = "";
  pics2Div.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const img1 = document.createElement("img");
    img1.src = `rpsfotolar/player1${["Rock", "Paper", "Scissors"][i]}.png`;
    img1.alt = ["Rock", "Paper", "Scissors"][i];
    img1.onclick = () => play(["rock", "paper", "scissors"][i]);
    picsDiv.appendChild(img1);

    if (num === 2) {
      const img2 = document.createElement("img");
      img2.src = `rpsfotolar/player2${["Rock", "Paper", "Scissors"][i]}.png`;
      img2.alt = ["Rock", "Paper", "Scissors"][i];
      img2.onclick = () => play(["rock", "paper", "scissors"][i]);
      pics2Div.appendChild(img2);
    }
  }

  numberOfPlayers = num;
  //document.getElementById("players").style.display = "block";
  toggleNextRoundButton();
}



// Rest of your code remains the same


function startNewGame() {
  // Reset names and scores
  player1Name = "";
  player2Name = "";
  player1Score = 0;
  player2Score = 0;
  currentRound = 1;
  document.getElementById("player1Name").textContent = "";
  document.getElementById("player2Name").textContent = "";
  document.getElementById("result").textContent = "";
  document.getElementById("pics").style.display = "none";
  document.getElementById("pics2").style.display = "none";
  document.querySelector(".next-round-button").style.display = "none";
}

function toggleNextRoundButton() {
  const selectedRounds = parseInt(document.getElementById("rounds").value);
  const button = document.querySelector(".next-round-button");
  button.style.display = selectedRounds > 2 ? "block" : "none";
}

function play(playerChoice) {
  document.getElementById("players").classList.add("players");
  if (numberOfPlayers === 1) {
    player1Name = prompt("Please enter your name:");
    player1Name = player1Name.trim() !== "" ? player1Name : "Player 1";
    document.getElementById("player1Name").textContent = player1Name;
  } else {
    player2Name = prompt("Please enter Player 2's name:");
    player2Name = player2Name.trim() !== "" ? player2Name : "Player 2";
    document.getElementById("player2Name").textContent = player2Name;
  }

  const computerChoice =
    numberOfPlayers === 1
      ? randomChoice()
      : prompt(player2Name + ", enter your choice (rock, paper, scissors):");

  let result;
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result =
      numberOfPlayers === 1 ? `${player1Name} wins!` : `${player1Name} wins!`;
  } else if (playerChoice === computerChoice) {
    result = "";
  } else {
    result = numberOfPlayers === 1 ? "Computer wins!" : `${player2Name} wins!`;
  }
  document.getElementById("result").textContent = result;

  if (result !== "") {
    updateScore(result);
  }
}

function nextRound() {
  currentRound++;
  document.getElementById("result").textContent = "";
  toggleNextRoundButton();
}

function randomChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateScore(winner) {
  const rounds = parseInt(document.getElementById("rounds").value);
  if (winner === `${player1Name} wins!`) {
    if (rounds % 2 === 0 && player1Score === rounds / 2) {
      document.getElementById("result").textContent = "Winner: " + player1Name;
      return;
    } else if (rounds % 2 !== 0 && player1Score === (rounds + 1) / 2) {
      document.getElementById("result").textContent = "Winner: " + player1Name;
      return;
    }
    player1Score++;
  } else if (winner === `${player2Name} wins!` || winner === "Computer wins!") {
    if (rounds % 2 === 0 && player2Score === rounds / 2) {
      document.getElementById("result").textContent = "Winner: " + player2Name;
      return;
    } else if (rounds % 2 !== 0 && player2Score === (rounds + 1) / 2) {
      document.getElementById("result").textContent = "Winner: " + player2Name;
      return;
    }
    player2Score++;
  }

  document.getElementById("player1Name").textContent =
    player1Name + " (Score: " + player1Score + ")";
  document.getElementById("player2Name").textContent =
    player2Name + " (Score: " + player2Score + ")";
}

let player1Score = 0;
let player2Score = 0;
