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
    
    return {
        getValue,
        setValue
    };
}

// Game overall Controller
function controller() {
    const players = [
        {
            name: "player1",
            token: 'X'
        },
        {
            name: "player2",
            token: 'Y'
        }
    ];
    
    let currentPlayerIndex = 1;  // Starts with player2
    const board = gameBoard();

    function switchPlayer() {
        if (currentPlayerIndex === 1) {
            currentPlayerIndex = 0;  // Switch to player1
        } else {
            currentPlayerIndex = 1;  // Switch to player2
        }
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

    // Return controller methods
    return {
        makeMove,
        getCurrentPlayer
    };
}

// Game ui and updates
function gameUi() {
    const game = controller();
    const clickableCells = document.querySelectorAll(".cells");

    clickableCells.forEach(function(cell, index) {  // Added missing parenthesis
        cell.addEventListener("click", function() {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const playerMove = game.makeMove(row, col);
        });
    });
}