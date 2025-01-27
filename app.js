// app.js
import * as tic from './src/tic-tac-toe.js';
import readlineSync from 'readline-sync';
import { readFile } from 'fs';

function generateComputerMove(board) {
    const emptyIndices = [];
    board.forEach((cell, index) => {
        if (cell === " ") {
            emptyIndices.push(index);
        }
    });

    if (emptyIndices.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    const boardIndex = emptyIndices[randomIndex];
    const { row, col } = tic.indexToRowCol(board, boardIndex);
    return `${String.fromCharCode(65 + row)}${col + 1}`;
}

function runGameLoop(board, playerLetter, computerLetter, computerMoves) {
    let currentPlayer = playerLetter === 'X' ? playerLetter : computerLetter;
    let winner = null;

    while (!tic.isBoardFull(board) && !winner) {
        if (currentPlayer === playerLetter) {
            let moveValid = false;
            while (!moveValid) {
                const move = readlineSync.question('What is your move? (e.g., B2): ');
                if (tic.isValidMove(board, move)) {
                    board = tic.placeLetter(board, playerLetter, move);
                    moveValid = true;
                    console.log('Your move:');
                } else {
                    console.log('Invalid move! Try again.');
                }
            }
        } else {
            readlineSync.question('Press <ENTER> to show computer\'s move...');
            let moveValid = false;
            let move;
            while (!moveValid && computerMoves.length > 0) {
                move = computerMoves.shift();
                if (tic.isValidMove(board, move)) {
                    moveValid = true;
                }
            }

            if (!moveValid) {
                move = generateComputerMove(board);
            }

            if (move) {
                board = tic.placeLetter(board, computerLetter, move);
                console.log(`Computer placed on ${move}`);
            } else {
                console.log("No valid moves left for computer.");
            }
        }

        displayBoard(board);
        winner = tic.getWinner(board);
        currentPlayer = currentPlayer === playerLetter ? computerLetter : playerLetter;
    }

    if (winner) {
        console.log(`${winner} won!`);
    } else if (tic.isBoardFull(board)) {
        console.log("It's a draw!");
    }
}

const configFileName = process.argv[2];

if (configFileName) {
    readFile(configFileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Configuration file not found');
            return;
        }
        try {
            const config = JSON.parse(data);
            initializeGame(config);
        } catch (e) {
            console.error('Error parsing JSON from config file:', e.message); // Using 'e' to show error message
            return;
        }
    });
} else {
    const defaultConfig = {
        board: "         ",
        playerLetter: 'X',
        computerLetter: 'O',
        computerMoves: []
    };
    initializeGame(defaultConfig);
}

function displayBoard(board) {
    const size = Math.sqrt(board.length);
    const header = '  ' + Array.from({ length: size }, (_, i) => `${i + 1}`.padStart(3, ' ')).join(' ');
    const line = '  +' + Array.from({ length: size }, () => '---+').join('').slice(0, -1) + '+';
    let boardDisplay = `${header}\n${line}\n`;

    for (let row = 0; row < size; row++) {
        const rowContent = board.slice(row * size, (row + 1) * size).map(cell => ` ${cell || ' '} |`).join('');
        boardDisplay += ` ${String.fromCharCode(65 + row)}|${rowContent}\n`;
        if (row < size - 1) {
            boardDisplay += line + '\n';
        }
    }
    boardDisplay += line;
    console.log(boardDisplay);
}

function initializeGame(config) {
    const board = tic.boardFromString(config.board);
    console.log(`Computer will make the following moves: ${config.computerMoves}`);
    console.log(`Player is ${config.playerLetter}, Computer is ${config.computerLetter}`);
    displayBoard(board);
    runGameLoop(board, config.playerLetter, config.computerLetter, config.computerMoves);
}
