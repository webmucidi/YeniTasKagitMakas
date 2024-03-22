let numberOfPlayers;
let player1Name, player2Name;
let maxRounds;
let currentRound = 1;

function selectPlayers(num) {
  const picsDiv = document.getElementById("pics");
  const pics2Div = document.getElementById("pics2");
  picsDiv.innerHTML = "";
  pics2Div.innerHTML = "";
  numberOfPlayers=num;
  console.log(numberOfPlayers);
  if (numberOfPlayers === 1) {
    player1Name = prompt("Please enter your name:");
    player1Name = player1Name.trim() !== "" ? player1Name : "Player 1";
    document.getElementById("player1Name").textContent = player1Name;
  } else if(numberOfPlayers === 2){
    player1Name = prompt("Please enter your name:");
    player1Name = player1Name.trim() !== "" ? player1Name : "Player 1";
    document.getElementById("player1Name").textContent = player1Name;
    player2Name = prompt("Please enter Player 2's name:");
    player2Name = player2Name.trim() !== "" ? player2Name : "Player 2";
    document.getElementById("player2Name").textContent = player2Name;
  }
  for (let i = 0; i < 3; i++) {
    const img1 = document.createElement("img");
    img1.src = `rpsfotolar/player1${["Rock", "Paper", "Scissors"][i]}.png`;
    img1.alt = ["rock", "paper", "scissors"][i];
    img1.onclick = () => play(img1.alt);
    picsDiv.appendChild(img1);

    if (num === 2) {
      const img2 = document.createElement("img");
      img2.src = `rpsfotolar/player2${["Rock", "Paper", "Scissors"][i]}.png`;
      img2.alt = ["rock", "paper", "scissors"][i];
      img2.onclick = () => play(img2.alt);
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
  document.getElementById("pics").innerHTML="";
  document.getElementById("pics2").innerHTML="";
  document.querySelector(".next-round-button").style.display = "none";
}

function toggleNextRoundButton() {
  const selectedRounds = parseInt(document.getElementById("rounds").value);
  const button = document.querySelector(".next-round-button");
  button.style.display = selectedRounds > 2 ? "block" : "none";
}

function play(playerChoice) {
  let choice1 = playerChoice;
  let choice2;

  if (numberOfPlayers === 1) {
    choice2 = randomChoice();
    alert("Your choice: " + choice1 + " and Computer choice: " + choice2);
  } else if (numberOfPlayers === 2) {
    if (!player1Name) {
      player1Name = prompt("Please enter Player 1's name:");
      player1Name = player1Name.trim() !== "" ? player1Name : "Player 1";
      document.getElementById("player1Name").textContent = player1Name;
    }

    // Wait for player 2 to click an image
    document.querySelectorAll("#pics2 img").forEach(img => {
      img.onclick = () => {
        choice2 = img.alt;
        alert("Your choice: " + choice1 + " and " + player2Name + "'s choice: " + choice2);

        let result;
        if (
          (choice1 === "rock" && choice2 === "scissors") ||
          (choice1 === "paper" && choice2 === "rock") ||
          (choice1 === "scissors" && choice2 === "paper")
        ) {
          result = `${player1Name} wins!`;
        } else if (choice1 === choice2) {
          result = "It's a tie. Try again!";
        } else {
          result = `${player2Name} wins!`;
        }
        document.getElementById("result").textContent = result;

        if (result !== "") {
          updateScore(result);
        }
      };
    });

    document.getElementById("player2Name").textContent = player2Name;
  } else {
    alert("Make a choice for single or multiplayer");
    return;
  }

  if (numberOfPlayers === 1) {
    let result;
    if (
      (choice1 === "rock" && choice2 === "scissors") ||
      (choice1 === "paper" && choice2 === "rock") ||
      (choice1 === "scissors" && choice2 === "paper")
    ) {
      result = `${player1Name} wins!`;
    } else if (choice1 === choice2) {
      result = "It's a tie. Try again!";
    } else {
      result = "Computer wins!";
    }
    document.getElementById("result").textContent = result;

    if (result !== "") {
      updateScore(result);
    }
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
