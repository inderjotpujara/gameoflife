// import { GameOfLife } from "./gameOfLife";
import GameOfLife from "./lifeGame";
import "./styles.css";

export default function App() {
  const rows = 10;
  const cols = 10;
  const initialLiveCells = ["5-5", "5-6", "6-7", "6-6", "7-6"]; // Example initial live cells
  return (
    <div className="App">
      <GameOfLife rows={rows} cols={cols} liveCells={initialLiveCells} />
    </div>
  );
}
