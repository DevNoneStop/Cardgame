import { useState } from 'react'
import './App.css'

type TCell = {
  row: number;
  col: number;
}

function App() {
  const [grid, setGrid] = useState([
    [0, 3, 0, 1],
    [4, 2, 0, 4],
    [3, 0, 2, 1]
  ])

  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false))
  );

  const [previousClick, setPreviousClick] = useState<TCell | undefined>();

  function handleCardClicked(rowIndex: number, colIndex: number) {
    // reveal the clicked card
    const clickedNumber = grid[rowIndex][colIndex];
    const newRGrid = [...revealedGrid];

    newRGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRGrid);

    //if one card has already been clicked prior
    //setPreviousClick(clickedNumber);

    if (previousClick) {
      const previousClickNo = grid[previousClick.row][previousClick?.col];
      //Second click
      if (previousClickNo !== clickedNumber) {
        setTimeout(() => {
          newRGrid[rowIndex][colIndex] = false;
          newRGrid[previousClick.row][previousClick.col] = false;
          setRevealedGrid([...newRGrid])
        }, 1000);
      }
      setPreviousClick(undefined); //Added a comment for save to git
    }
    else {
      setPreviousClick({
        row: rowIndex,
        col: colIndex
      });
      //check if everything has been revealed show an alert
    }
    //if both clicked, mark them as answered
    //if not match hide after 1 second


  }


  return (<div className="App" >
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <div
              onClick={() => handleCardClicked(rowIndex, colIndex)}
              key={colIndex}>
              <div className='card'>
                {revealedGrid[rowIndex][colIndex] ? col : " "}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
  );
}

export default App;
