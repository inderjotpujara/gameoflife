

This project is a React implementation of Conway's Game of Life, a cellular automaton devised by the British mathematician John Horton Conway in 1970.

## Description

The Game of Life is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

## Usage

```jsx
import GameOfLife from './GameOfLife';

function App() {
  return (
    <div className="App">
      <GameOfLife rows={50} cols={50} />
    </div>
  );
}

export default App;
```

In the above example, a Game of Life board with 50 rows and 50 columns is created. You can customize the size of the board by changing the `rows` and `cols` props.

# Function Descriptions

This section provides a detailed description of the functions used in the Game of Life code.

## getNeighborPositions(row, col, rows, cols)

This function takes in a cell's row and column indices, and the total number of rows and columns in the grid. It returns an array of positions of the cell's neighbors. It first creates an array of all possible neighbor positions, then filters out those that are outside the grid.

## isLive(r, c)

This function takes in a cell's row and column indices and checks if the cell is live. It does this by checking if the cell's position is in the `live` set.

## updateCellStates()

This function updates the states of all cells in the grid according to the rules of the Game of Life. It first creates a new set for the new live cells and a map to count the live neighbors for each cell. It then iterates over all live cells, counts their live neighbors, and adds the cell to the new live cells set if it survives. It also updates the counts map for each dead neighbor. After that, it iterates over the counts map and adds any cell with exactly three live neighbors to the new live cells set. Finally, it updates the `live` state with the new live cells set.

## useEffect(() => { updateCellStates(); }, [])

This effect runs once when the component mounts. It calls `updateCellStates()` to initialize the cell states.

## useEffect(() => { const interval = setInterval(updateCellStates, 1000); return () => clearInterval(interval); }, [live])

This effect runs whenever the `live` state changes. It starts an interval that calls `updateCellStates()` every second, and clears the interval when the component unmounts or the `live` state changes.

## renderGrid()

This function renders the grid. It creates an array of div elements for each cell in the grid, with the `backgroundColor` style property set to "red" for live cells and "green" for dead cells. It then wraps each row of cells in a div element and returns the array of row elements.

## GameOfLife({ rows, cols, liveCells})

This is the main component function. It takes in props for the number of rows and columns in the grid, and an optional array of initial live cells. It initializes the `live` state with the initial live cells, calculates the container width and height based on the number of rows and columns and the cell size, and returns a div element that contains the rendered grid.
