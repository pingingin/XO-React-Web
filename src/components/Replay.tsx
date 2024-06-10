import { useEffect, useState } from 'react'

interface AllReplay {
    size: number
    mode: string
    moves: {
        rowIndex: number
        cellIndex: number
        turn: string
    }[]
}

interface ReplayProps {
    handleViewReplay: (index: number, boardSizeReplay: number) => void;
}

function Replay(props: ReplayProps) {
    const [allReplay, setAllReplay] = useState<AllReplay[]>([])
    const loadReplay = () => {
        var allReplayArr = localStorage.getItem("allReplay");
        if (allReplayArr) {
            setAllReplay(JSON.parse(allReplayArr))
        }
    }

    useEffect(() => {
        loadReplay()
    }, [])

    return (
        <>
            {allReplay.length > 0 ?
                <table className='replay'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Board Size</th>
                            <th>Mode</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allReplay.map((replay, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{replay.size}</td>
                                <td>{replay.mode}</td>
                                <td>
                                    <button onClick={() => props.handleViewReplay(index, replay.size)}>Play</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
                : <p>0 Replay</p>
            }
        </>


    )
}

export default Replay