# Tic-Tac-Toe Game

## Overview

The Tic-Tac-Toe Game is a JavaScript-based implementation that allows a player to compete against the computer. It supports customizable board sizes, various configurations, and smart game logic to ensure a challenging and engaging gameplay experience.

## Directory Structure

```
.
├── src
│   └── tic-tac-toe.js       # Core game logic and helper functions
├── test
│   └── tic-tac-toe-test.mjs # Unit tests for the game logic
├── app.js                   # Game application entry point
├── eslint.config.js         # ESLint configuration file
├── package.json             # Node.js project metadata
├── package-lock.json        # Lock file for Node.js dependencies
├── testWidthFive.json       # Example configuration for a 5x5 game board
├── README.md                # Documentation file
```

## Features

- **Customizable Board Sizes**: Supports any square board size (e.g., 3x3, 4x4, 5x5).
- **Player vs. Computer**: Allows a human player to compete against a computer.
- **Computer AI**: Computer generates valid moves and utilizes pre-configured moves if available.
- **Configurable Game States**: Load a game state from a JSON configuration file.
- **Validations**: Ensures valid moves and board configurations.
- **Unit Tests**: Comprehensive tests for all game logic using Mocha and Chai.

## Dependencies

- Node.js
- Readline-Sync
- Mocha (for testing)
- Chai (for assertions)

## Installation

### Prerequisites

Ensure Node.js is installed on your system.

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Tic-Tac-Toe
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Game

To start the game, use the following command:

```bash
node app.js [configFile]
```

- Replace `[configFile]` with the path to a JSON configuration file (optional).
- If no configuration file is provided, a default game configuration will be used.

### Example Configuration File

Here is an example `testWidthFive.json` configuration:

```json
{
  "board": " XO   X  O               ",
  "playerLetter": "X",
  "computerLetter": "O",
  "computerMoves": ["E1", "C3"]
}
```

### Game Commands

- **Player Move**: Enter a move in algebraic notation (e.g., `A1`, `B2`).
- **Computer Move**: Automatically generated or loaded from the configuration file.

## Development

### Code Structure

#### `src/tic-tac-toe.js`

- **Core Functions**:
  - `generateBoard(rows, cols, initialValue)`: Creates a game board of the specified size.
  - `boardFromString(s)`: Converts a string to a board array.
  - `rowColToIndex(board, row, col)`: Converts row/column to board index.
  - `indexToRowCol(board, index)`: Converts board index to row/column.
  - `setBoardCell(board, letter, row, col)`: Sets a cell to a specific letter.
  - `algebraicToRowCol(algebraicNotation)`: Converts algebraic notation to row/column.
  - `placeLetter(board, letter, algebraicNotation)`: Places a letter on the board.
  - `getWinner(board)`: Checks for a winner.
  - `isBoardFull(board)`: Checks if the board is full.
  - `isValidMove(board, algebraicNotation)`: Validates a move.

#### `app.js`

- Handles user input and game flow.
- Displays the game board after each move.
- Uses configuration files for custom game setups.

#### `test/tic-tac-toe-test.mjs`

- Unit tests for all core functions using Mocha and Chai.

### Running Tests

in the root directory run

```bash
npx mocha test/tic-tac-toe-test.mjs
```

npx will download a module if it's not already installed, and run it
