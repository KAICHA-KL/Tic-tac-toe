// Gameboard array
function gameBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(cell());
        }
    }
    return board;
}

// Board cell activities 
function cell() {
    let value = '';
    const getValue = () => value;
    const setValue = (newValue) => { value = newValue; };
    return { getValue, setValue };
}

// Game overall Controller
function controller(player1Name, player2Name) {
    const players = [
        { name: player1Name || "Player 1", token: 'X' },
        { name: player2Name || "Player 2", token: 'O' }
    ];
    let currentPlayerIndex = 0;
    const board = gameBoard();

    function switchPlayer() {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    function getCurrentPlayer() {
        return players[currentPlayerIndex];
    }

    function makeMove(row, col) {
        if (board[row][col].getValue() === '') {
            board[row][col].setValue(getCurrentPlayer().token);
            switchPlayer();
            return true;
        }
        return false;
    }

    function checkWin(row, col) {
        const token = board[row][col].getValue();

        // Check row
        if (board[row][0].getValue() === token && 
            board[row][1].getValue() === token && 
            board[row][2].getValue() === token) {
            return true;
        }

        // Check column
        if (board[0][col].getValue() === token && 
            board[1][col].getValue() === token && 
            board[2][col].getValue() === token) {
            return true;
        }

        // Check main diagonal
        if (row === col) {
            if (board[0][0].getValue() === token && 
                board[1][1].getValue() === token && 
                board[2][2].getValue() === token) {
                return true;
            }
        }

        // Check anti-diagonal
        if (row + col === 2) {
            if (board[0][2].getValue() === token && 
                board[1][1].getValue() === token && 
                board[2][0].getValue() === token) {
                return true;
            }
        }

        return false;
    }

    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j].setValue('');
            }
        }
        currentPlayerIndex = 0; // Reset to Player 1
    }

    function getBoard() {
        return board;
    }

    return { makeMove, getCurrentPlayer, getBoard, checkWin, resetBoard };
}

// Game UI and updates
function gameUi() {
    let game; // Will be initialized after start
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const container = document.getElementById('gameboard-container');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const player1Input = document.getElementById('player1-name');
    const player2Input = document.getElementById('player2-name');

    function buildCellsUi(row, col) {
        const cellElement = document.createElement('div');
        cellElement.className = 'btn btn-square btn-ghost border border-base-300 hover:bg-base-200 w-20 h-20 flex items-center justify-center';
        const textElement = document.createElement('p');
        textElement.className = 'text-4xl font-bold text-base-content';
        cellElement.appendChild(textElement);
        cellElement.dataset.row = row;
        cellElement.dataset.col = col;
        return cellElement;
    }

    function updateCellDisplay(row, col) {
        const cellElement = container.querySelector(`[data-row="${row}"][data-col="${col}"] p`);
        if (cellElement) {
            cellElement.textContent = game.getBoard()[row][col].getValue();
        }
    }

    function initBoard() {
        container.innerHTML = ''; // Clear existing cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = buildCellsUi(i, j);
                container.appendChild(cell);
            }
        }

        container.querySelectorAll('.btn').forEach(cell => {
            cell.addEventListener('click', function() {
                const row = parseInt(this.dataset.row);
                const col = parseInt(this.dataset.col);
                if (game.makeMove(row, col)) {
                    updateCellDisplay(row, col);
                    if (game.checkWin(row, col)) {
                        alert(`${game.getCurrentPlayer().name} wins!`);
                        resetGame();
                    }
                }
            });
        });
    }

    function resetGame() {
        game.resetBoard();
        initBoard(); // Rebuild UI with cleared board
    }

    function startGame() {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();
        game = controller(player1Name, player2Name);
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        initBoard();
    }

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
}

gameUi();