import React, { useState, useEffect } from "react";

function getNeighborPositions(row, col, rows, cols) {
  const positions = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  // Filter out positions that are outside the grid
  return positions.filter(([r, c]) => r >= 0 && r < rows && c >= 0 && c < cols);
}

export function GameOfLife({
  rows,
  cols,
  liveCells = ["1-2", "2-2", "2-1", "2-0", "3-3"],
}) {
  const [live, setLive] = useState(new Set(liveCells));

  const cellSize = 22; // size in pixels
  const containerWidth = cols * cellSize;
  const containerHeight = rows * cellSize;

  const isLive = (r, c) => live.has(`${r}-${c}`);

  const updateCellStates = () => {
    let newLiveCells = new Set();
    let counts = new Map(); // To count live neighbors for each cell

    live.forEach((cell) => {
      const [r, c] = cell.split("-").map(Number);
      const neighbors = getNeighborPositions(r, c, rows, cols);

      let liveNeighbors = 0;
      neighbors.forEach(([nr, nc]) => {
        if (isLive(nr, nc)) {
          liveNeighbors++;
        } else {
          counts.set(`${nr}-${nc}`, (counts.get(`${nr}-${nc}`) || 0) + 1);
        }
      });

      if (liveNeighbors === 2 || liveNeighbors === 3) {
        newLiveCells.add(cell);
      }
    });

    counts.forEach((count, cell) => {
      if (count === 3) {
        newLiveCells.add(cell);
      }
    });

    setLive(newLiveCells);
  };

  useEffect(() => {
    updateCellStates();
  }, []);
  useEffect(() => {
    const interval = setInterval(updateCellStates, 1000);
    return () => clearInterval(interval);
  }, [live]);

  const renderGrid = () => {
    let grid = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        row.push(
          <div
            key={`${r}-${c}`}
            style={{
              backgroundColor: isLive(r, c) ? "red" : "green",
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              margin: "1px",
              border: "1px solid black",
            }}
          />
        );
      }
      grid.push(
        <div key={r} style={{ display: "flex" }}>
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <div
      style={{
        height: `${containerHeight}px`,
        width: `${containerWidth}px`,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {renderGrid()}
    </div>
  );
}

export default GameOfLife;
