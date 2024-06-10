import { useEffect, useState } from 'react'

interface BoardProps {
    size: number
    viewReplayIndex: number
    playWithBot: boolean
    handleStateGame: (value: boolean) => void
}

interface Replay {
    rowIndex: number
    cellIndex: number
    turn: string
}

function Board(props: BoardProps) {
    const [board, setBoard] = useState<string[][]>([]);
    const [turn, setTurn] = useState('X');
    const [winner, setWinner] = useState('');
    const [replay, setReplay] = useState<Replay[]>([]);
    const [replayState, setReplayState] = useState(false);
    const [turnPlayer, setTurnPlayer] = useState(-1);

    const botPlay = async () => {
        const getEmptyCells = (board: string[][]): [number, number][] => {
            const emptyCells: [number, number][] = [];
            for (let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[row].length; col++) {
                    if (board[row][col] === '') {
                        emptyCells.push([row, col]);
                    }
                }
            }
            return emptyCells;
        };

        const getRandomInt = (max: number): number => {
            return Math.floor(Math.random() * max);
        };

        if(winner == '') {
            const emptyCells = getEmptyCells(board);
            const randomIndex = getRandomInt(emptyCells.length);
            const [rowRand, cellRand] = emptyCells[randomIndex];
    
            updateCell(rowRand, cellRand, turn);
        }
    };

    const initialBoard = async () => {
        setReplayState(false);
        const newBoard = Array.from({ length: props.size }, () =>
            Array.from({ length: props.size }, () => '')
        );
        setBoard(newBoard);
        setWinner('');
        setTurn('X');
        setReplay([]);
    };

    const updateCell = async (rowIndex: number, cellIndex: number, currentTurn: string) => {
        const newBoard = [...board];
        if (newBoard[rowIndex][cellIndex] === '') {
            newBoard[rowIndex][cellIndex] = currentTurn;
            
            if (!replayState) {
                const prevReplay = [...replay];
                prevReplay.push({ rowIndex, cellIndex, turn });
                setReplay(prevReplay);
            }
            setBoard(newBoard);

            let winnerPlayer = await checkWin(rowIndex, cellIndex);
            setWinner(winnerPlayer);

            setTurn(currentTurn === 'X' ? 'O' : 'X');
        }
    }

    const saveReplay = () => {
        const allReplay = localStorage.getItem("allReplay");
        if (!allReplay) {
            localStorage.setItem("allReplay", JSON.stringify([{ "moves": replay, "size": props.size, "mode": props.playWithBot ? "Player Vs Bot" : "2 Player"}]));
        } else {
            const allReplayArr = JSON.parse(allReplay);
            if (allReplayArr.length >= 5) {
                allReplayArr.shift();
            }
            allReplayArr.push({ "moves": replay, "size": props.size, "mode": props.playWithBot ? "Player Vs Bot" : "2 Player" });
            localStorage.setItem("allReplay", JSON.stringify(allReplayArr));
        }
    };

    const viewReplay = async (index: number | null) => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        var allReplay = localStorage.getItem("allReplay");
        if (allReplay != null) {
            var allReplayArr = JSON.parse(allReplay);
            let viewIndex = allReplayArr.length - 1;
            if (index) {
                viewIndex = index;
            }
            const replayArr = allReplayArr[viewIndex];
            console.log(replayArr);

            for (let i = 0; i < replayArr.moves.length; i++) {
                updateCell(replayArr.moves[i].rowIndex, replayArr.moves[i].cellIndex, replayArr.moves[i].turn);
                await delay(800);
            }
        }
    }

    const checkWin = async (rowIndex: number, cellIndex: number) => {
        const boardSize = props.size;
        const currentPlayer = board[rowIndex][cellIndex];

        // Helper function to check a line
        const checkLine = (cells: [number, number][]) => {
            return cells.every(([row, col]) => board[row][col] === currentPlayer);
        };

        // Check horizontal line
        if (checkLine([...Array(boardSize).keys()].map(j => [rowIndex, j]))) {
            return currentPlayer;
        }

        // Check vertical line
        if (checkLine([...Array(boardSize).keys()].map(i => [i, cellIndex]))) {
            return currentPlayer;
        }

        // Check oblique top left to down right
        if (rowIndex === cellIndex && checkLine([...Array(boardSize).keys()].map(i => [i, i]))) {
            return currentPlayer;
        }

        // Check oblique top right to down left
        if (rowIndex + cellIndex === boardSize - 1 && checkLine([...Array(boardSize).keys()].map(i => [i, boardSize - 1 - i]))) {
            return currentPlayer;
        }

        // Check for a draw
        if (board.every(row => row.every(cell => cell !== ""))) {
            return 'Draw';
        }

        return '';
    };

    useEffect(() => {
        initialBoard()
        if (props.viewReplayIndex != -1) {
            setReplayState(true)
        }
    }, []);

    useEffect(() => {
        if (!replayState && winner != '') {
            saveReplay();
        }
    }, [winner]);

    useEffect(() => {
        if (replayState) {
            viewReplay(props.viewReplayIndex == -1 ? null : props.viewReplayIndex)
        }
    }, [replayState]);

    useEffect(() => {
        if (turnPlayer == 1) {
            botPlay()
        }
    }, [turnPlayer]);

    useEffect(() => {
        if(winner == '' && !replayState) {
            if ((turnPlayer == 0 && turn == 'O') || (turnPlayer == 1 && turn == 'X')) {
                botPlay()
            }
        }
    }, [turn]);

    return (
        <>

            <div className='mode'>Mode:
                {!props.playWithBot ?
                    ' 2 Player' : ' Player Vs Bot'}
            </div>

            {
                winner != '' ? <div className="winner">{replayState ? 'Replay ' : ''}Winner: {winner}</div> : <div className="play-turn">{replayState ? 'Replay ' : ''}Turn: {turn}</div>
            }

            <div className="board">
                {
                    board.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {!props.playWithBot ?
                                row.map((cell, cellIndex) => (
                                    <div key={cellIndex} className="cell" onClick={() => (winner == '' && !replayState) ? updateCell(rowIndex, cellIndex, turn) : {}}>
                                        {cell}
                                    </div>
                                )) :
                                row.map((cell, cellIndex) => (
                                    <div key={cellIndex} className="cell" onClick={() => (winner == '' && !replayState && turnPlayer != -1) ? updateCell(rowIndex, cellIndex, turn) : {}}>
                                        {cell}
                                    </div>
                                ))
                            }
                        </div>
                    ))}
            </div>
            {
                props.playWithBot && turnPlayer != -1 ? turnPlayer == 0 ? <div className='player'>Player : X</div> : <div className='player'>Player : O</div>: ''
            }
            {
                props.playWithBot && turnPlayer == -1 && !replayState?
                    <div className="option">
                        <button onClick={() => setTurnPlayer(0)}>
                            First (X)
                        </button>
                        <button onClick={() => setTurnPlayer(1)}>
                            Second (O)
                        </button>
                    </div> : ''
            }
            <div className="option">
                <button onClick={() => props.handleStateGame(false)}>
                    Back
                </button>
                {
                    props.viewReplayIndex == -1 && !replayState?
                        <button onClick={async () => await initialBoard()}>
                            Restart
                        </button> : ''
                }

                {
                    winner != '' ? <button onClick={async () => {
                        await initialBoard();
                        setReplayState(true)
                    }}>
                        View Replay
                    </button> : ''
                }
            </div>
        </>
    )
}

export default Board