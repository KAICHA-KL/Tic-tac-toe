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
function controller() {
    const players = [
        { name: "player1", token: 'X' },
        { name: "player2", token: 'O' }
    ];
    let currentPlayerIndex = 0; // Start with player1 (X)
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

    function getBoard() {
        return board;
    }

    return { makeMove, getCurrentPlayer, getBoard };
}

// Game UI and updates
function gameUi() {
    const game = controller();
    const container = document.getElementById('gameboard-container');

    function buildCellsUi(row, col) {
        // Create the cell element directly (no extra block wrapper)
        const cellElement = document.createElement('div');
        cellElement.className = 'btn btn-square btn-lg btn-ghost border border-base-300 hover:bg-base-200 w-20 h-20 flex items-center justify-center';
        
        const textElement = document.createElement('p');
        textElement.className = 'text-4xl font-bold text-base-content';
        
        cellElement.appendChild(textElement);
        cellElement.dataset.row = row;
        cellElement.dataset.col = col;
        
        return cellElement; // Return the cell directly
    }

    function updateCellDisplay(row, col) {
        const cellElement = container.querySelector(`[data-row="${row}"][data-col="${col}"] p`);
        cellElement.textContent = game.getBoard()[row][col].getValue();
    }

    function initGame() {
        if (!container) return;

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
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', initGame);
}

// Start the game UI
gameUi();