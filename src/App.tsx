import { useState } from 'react'
import Board from './components/Board'
import Replay from './components/Replay'
import './App.css'

function App() {
  const [stateGame, setStateGame] = useState(false)
  const [boardSize, setBoardSize] = useState(3)
  const [showReplay, setShowReplay] = useState(false)
  const [viewReplayIndex, setViewReplayIndex] = useState(-1)
  const [playWithBot, setPlayWithBot] = useState(false)

  const playGame = () => {
    if (boardSize >= 3) {
      setStateGame(true)
      setViewReplayIndex(-1)
      setPlayWithBot(false)
    }
  }
  const playGameWithBot = () => {
    if (boardSize >= 3) {
      setStateGame(true)
      setViewReplayIndex(-1)
      setPlayWithBot(true)
    }
  }

  const handleBoardSizeOnchange = (value: number) => {
    setBoardSize(value)
  }
  const handleStateGame = (value: boolean) => {
    setStateGame(value)
  }

  const handleViewReplay = (index: number, boardSizeReplay:number) => {
    setBoardSize(boardSizeReplay)
    setViewReplayIndex(index)
    setStateGame(true)
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {!stateGame ?
        <div className="card">
          <div className='size-select'>
            <label htmlFor="size">Board Size </label>
            <input type="number" name='size' min={3} value={boardSize} onChange={e => handleBoardSizeOnchange(parseInt(e.target.value) ?? 3)} />
          </div>
          <div className='option'>
            <button onClick={() => playGame()}>
              2 Player
            </button>
            <button onClick={() => playGameWithBot()}>
              Player Vs Bot
            </button>
          </div>
          <div className='option'>
            <button onClick={() => setShowReplay(!showReplay)}>
              { !showReplay ? 'View Replay' : 'Hide Replay'}
            </button>
          </div>

        </div> :
        <Board size={boardSize} handleStateGame={handleStateGame} viewReplayIndex={viewReplayIndex} playWithBot={playWithBot} />
      }
      {showReplay && !stateGame ?
        <Replay handleViewReplay={handleViewReplay}/>
        : ''
      }
    </>
  )
}

export default App
