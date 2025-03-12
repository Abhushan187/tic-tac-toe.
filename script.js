// Get elements
const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const gameModeSelect = document.getElementById('gameMode'); // Dropdown to select game mode (player vs player or player vs computer)

// Initialize the game
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isPlayerVsComputer = false; // Determines if the game is player vs computer

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

// Handle cell click
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    
    // Only proceed if the cell is empty and the game is active
    if (gameBoard[index] !== '' || !gameActive) return;

    // Update the game board
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check for a winner
    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        // Clear the board after a short delay (to show the message)
        setTimeout(clearBoard, 2000);  // Clear the board after 2 seconds
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
        // Clear the board after a short delay (to show the message)
        setTimeout(clearBoard, 2000);  // Clear the board after 2 seconds
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = isPlayerVsComputer && currentPlayer === 'O' 
            ? "Computer's turn"
            : `Player ${currentPlayer}'s turn`;

        // If it's player vs computer and it's the computer's turn
        if (isPlayerVsComputer && currentPlayer === 'O') {
            setTimeout(computerMove, 500); // Delay to simulate thinking
        }
    }
}

// Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Computer makes a move (Player O always wins)
function computerMove() {
    if (!gameActive) return;

    // Simple AI: Random move (but allowing player to win)
    let emptyCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
    });

    if (emptyCells.length === 0) return;

    // Let the player win by choosing a random empty spot
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Update the game state and UI
    gameBoard[randomIndex] = 'O';
    document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = 'O';

    // Check if the computer wins
    if (checkWinner()) {
        message.textContent = `Computer wins!`;
        gameActive = false;
        setTimeout(clearBoard, 1000);  // Clear the board after 2 seconds
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
        setTimeout(clearBoard, 1000);  // Clear the board after 2 seconds
    } else {
        // Switch back to player X
        currentPlayer = 'X';
        message.textContent = `Player X's turn`;
    }
}

// Clear the game board
function clearBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player X's turn`;

    // Clear the board visually
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
}

// Reset the game
resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player X's turn`;

    // Clear the board
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
});

// Change game mode (Player vs Player or Player vs Computer)
gameModeSelect.addEventListener('change', (e) => {
    isPlayerVsComputer = e.target.value === 'computer';
    resetGame();
});

// Reset game logic for different modes
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = isPlayerVsComputer ? `Player X's turn` : `Player X's turn (Player vs Player)`;

    // Clear the board
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
}
