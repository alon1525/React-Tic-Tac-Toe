import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winningCombinations";
import GameOver from "./Components/GameOver";

function derivedCurrentPlayer(Gameturns) {
  let curPlayer = "X";
  if (Gameturns.length > 0 && Gameturns[0].player === "X") {
    curPlayer = "O";
  }
  return curPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(turns){
  let gameBoard = [...initialGameBoard.map((slot) => [...slot])];
  for (const turn of turns) {
    const { location, player } = turn;
    const { row, column } = location;
    gameBoard[row][column] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].column];
    const second = gameBoard[combination[1].row][combination[1].column];
    const third = gameBoard[combination[2].row][combination[2].column];

    if (first && first === second && first === third) {
      winner = players[first];
    }
  }
  return winner;
}

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

function App() {
  const [turns, setTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const curPlayer = derivedCurrentPlayer(turns);
  const gameBoard = deriveGameBoard(turns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = turns.length === 9 && !winner;
  function restart(){
    setTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  function ChangePlayer(rowIndex, columnIndex) {
    setTurns((previousTurns) => {
      let curPlayer = derivedCurrentPlayer(previousTurns);
      const newTurns = [
        { location: { row: rowIndex, column: columnIndex }, player: curPlayer },
        ...previousTurns,
      ];
      return newTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={curPlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={curPlayer === "O"}
            onChangeName={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} restart={restart}/>}
        <GameBoard changePlayer={ChangePlayer} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
