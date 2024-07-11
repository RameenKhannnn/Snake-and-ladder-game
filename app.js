document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 10;
    const players = [
      { id: 1, position: 0, color: "#3498db" },
      { id: 2, position: 0, color: "#e74c3c" },
    ];
    let currentPlayerIndex = 0;
  
    const snakes = {
      16: 6,
      47: 26,
      49: 11,
      56: 53,
      62: 19,
      64: 60,
      87: 24,
      93: 73,
      95: 75,
      98: 78,
    };
    const ladders = {
      1: 38,
      4: 14,
      9: 31,
      21: 42,
      28: 84,
      36: 44,
      51: 67,
      71: 91,
      80: 100,
    };
  
    const board = document.getElementById("board");
    const rollDiceButton = document.getElementById("rollDice");
    const diceResult = document.getElementById("diceResult");
    const currentPlayerDisplay = document.getElementById("currentPlayer");
  
    // Initialize board
    for (let i = 0; i < boardSize; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
  
    // Add snakes and ladders to the board
    const addSnakesAndLadders = () => {
      const cells = board.getElementsByTagName("td");
      for (const [start, end] of Object.entries(snakes)) {
        const cellIndex = boardSize * boardSize - start;
        if (cells[cellIndex]) {
          const snakeElement = document.createElement("div");
          snakeElement.classList.add("snake");
          cells[cellIndex].appendChild(snakeElement);
        }
      }
      for (const [start, end] of Object.entries(ladders)) {
        const cellIndex = boardSize * boardSize - start;
        if (cells[cellIndex]) {
          const ladderElement = document.createElement("div");
          ladderElement.classList.add("ladder");
          cells[cellIndex].appendChild(ladderElement);
        }
      }
    };
  
    // Roll dice function
    const rollDice = () => {
      return Math.floor(Math.random() * 6) + 1;
    };
  
    // Update player position on board
    const updatePlayerPosition = (player) => {
      const cells = board.getElementsByTagName("td");
      [...cells].forEach((cell) => (cell.innerHTML = ""));
  
      players.forEach((player) => {
        const cellIndex = boardSize * boardSize - player.position;
        if (cells[cellIndex]) {
          const playerElement = document.createElement("div");
          playerElement.style.backgroundColor = player.color;
          playerElement.classList.add("player");
          cells[cellIndex].appendChild(playerElement);
        }
      });
  
      addSnakesAndLadders();
    };
  
    // Move player
    const movePlayer = (player, steps) => {
      player.position += steps;
      if (player.position in snakes) {
        player.position = snakes[player.position];
      } else if (player.position in ladders) {
        player.position = ladders[player.position];
      }
      if (player.position >= 100) {
        alert(`Player ${player.id} wins!`);
        resetGame();
      } else {
        updatePlayerPosition(player);
      }
    };
  
    // Reset game
    const resetGame = () => {
      players.forEach((player) => (player.position = 0));
      currentPlayerIndex = 0;
      updatePlayerPosition(players[0]);
    };
  
    // Roll dice event
    rollDiceButton.addEventListener("click", () => {
      const dice = rollDice();
      diceResult.textContent = `Dice: ${dice}`;
      movePlayer(players[currentPlayerIndex], dice);
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      currentPlayerDisplay.textContent = `Current Player: ${players[currentPlayerIndex].id}`;
    });
  
    // Initial setup
    resetGame();
    addSnakesAndLadders();
  });