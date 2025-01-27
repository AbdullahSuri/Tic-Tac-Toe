// tic-tac-toe.js
function repeat(initVal, length) {
    return Array(length).fill(initVal);
}    

function generateBoard(rows, cols, initialValue) {
    const blankValue = initialValue || " ";
    return repeat(blankValue, rows * cols);
}

function boardFromString(s) {
    const validChars = [' ', 'X', 'O'];
    if (s.split('').every(char => validChars.includes(char))) {
        const length = s.length;
        const sideLength = Math.sqrt(length);

        if (Number.isInteger(sideLength)) {
            return s.split('').map(char => char === "" ? null : char);
        }
    }
    return null;
}

function rowColToIndex(board, row, col) {
    const width = Math.sqrt(board.length);
    const index = col + (row * width);
    return index;
}

function indexToRowCol(board, i) {
    const width = Math.sqrt(board.length);
    const col = i % width;
    const row = ((i - col) / width);
    return { "row": row, "col": col };
}

function setBoardCell(board, letter, row, col) {
    const index = rowColToIndex(board, row, col);
    const boardcopy = board.slice();
    boardcopy[index] = letter;
    return boardcopy;
}

 
function algebraicToRowCol(algebraicNotation) {
    const asci = algebraicNotation.charCodeAt(0);
    const numPart = algebraicNotation.slice(1);
    const num = parseInt(numPart, 10);

    if (asci < 65 || asci > 90 || numPart !== num.toString() || num < 1 || num > 26) {
        return undefined;
    }

    const row = asci - 65;
    const col = num - 1;
    return { "row": row, "col": col };
}

function placeLetter(board, letter, algebraicNotation) {
    const rowcolobj = algebraicToRowCol(algebraicNotation);
    return setBoardCell(board, letter, rowcolobj.row, rowcolobj.col); 
}


function getWinner(board) {
    const size = Math.sqrt(board.length);
    // Check each row for a winner
    for (let row = 0; row < size; row++) {
        const start = row * size; 
        const character = board[start]; 
        if (character && character !== ' ') {
            let winner = true; 
            for (let i = 1; i < size; i++) {
                if (board[start + i] !== character) {
                    winner = false; 
                    break;
                }
            }
            if (winner) {
                return character;
            }
        }
    }
    // Check each column for a winner
    for (let column = 0; column < size; column++) {
        const start = column; 
        const character = board[start]; 
        if (character && character !== ' ') {
            let winner = true; 
            for (let i = 1; i < size; i++) {
                if (board[start + i * size] !== character) {
                    winner = false; 
                    break;
                }
            }
            if (winner) {
                return character;
            }
        }
    }
    // Check diagonal from upper left to lower right
    let character = board[0];  
    if (character && character !== ' ') {
        let winner = true;
        for (let i = 1; i < size; i++) {
            if (board[i * (size + 1)] !== character) {  
                winner = false;
                break;
            }
        }
        if (winner) {
            return character;
        }
    }
    // Check diagonal from upper right to lower left
    character = board[size - 1]; 
    if (character && character !== ' ') {
        let winner = true;
        for (let i = 1; i < size; i++) {
            if (board[(i + 1) * (size - 1)] !== character) {
                winner = false;
                break;
            }
        }
        if (winner) {
            return character;
        }
    }
    return undefined;
}

function isBoardFull(board) {
    return board.every(cell => cell !== " ");
}


function isValidMove(board, algebraicNotation) {
    const size = Math.sqrt(board.length);  
    const rowCol = algebraicToRowCol(algebraicNotation);  
    if (!rowCol) {
        return false;  
    }

    const row = rowCol.row;
    const col = rowCol.col;
    const index = rowColToIndex(board, row, col);  

    return (row < size && col < size && board[index] === " ");
}


export { generateBoard, boardFromString, rowColToIndex, indexToRowCol, setBoardCell, algebraicToRowCol, placeLetter, getWinner, isBoardFull, isValidMove };