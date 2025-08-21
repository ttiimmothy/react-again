import { createFileRoute } from '@tanstack/react-router'
import {useEffect, useState} from "react";
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  // const [turn, setTurn] = useState("O");
  const [boxes, setBoxes] = useState(["","","","","","","","",""])
  // const [boxes, setBoxes] = useState([Array(9).fill(null)])
  const [winner, setWinner] = useState<string | null>(null)
  const [history, setHistory] = useState([boxes])
  const [currentMove, setCurrentMove] = useState(0)
  const turn = currentMove % 2 === 0 ? "O" : "X"

  useEffect(() => {
    if (boxes[0] && (boxes[0] === boxes[1] && boxes[1] === boxes[2]) || (boxes[0] === boxes[3] && boxes[3] === boxes[6]) || (boxes[0] === boxes[4] && boxes[4] === boxes[8])) {
      setWinner(boxes[0])
    } else if (boxes[1] && (boxes[1] === boxes[4] && boxes[4] === boxes[7])) {
      setWinner(boxes[1])
    } else if (boxes[2] && (boxes[2] === boxes[5] && boxes[5] === boxes[8]) || (boxes[2] === boxes[4] && boxes[4] === boxes[6])) {
      setWinner(boxes[2])
    } else if (boxes[3] && boxes[3] && boxes[3] === boxes[4] && boxes[4] === boxes[5]) {
      setWinner(boxes[3])
    } else if (boxes[6] && boxes[6] && boxes[6] === boxes[7] && boxes[7] === boxes[8]) {
      setWinner(boxes[6])
    }
  }, [turn, boxes])

  const renewHistory = (squares: string[]) => {
    // this needs to specify the slice range because the currentMove can jump back
    const newHistory = [...history.slice(0, currentMove + 1), squares]
    setHistory(newHistory)
    setCurrentMove(currentMove + 1)
  }

  const typeIn = (i: number) => {
    if (!boxes[i] && !winner) {
      const newBoxes = boxes.slice()
      if (turn === "O") {
        setBoxes(() => {
          newBoxes[i] = "O";
          return newBoxes
        })
        // setTurn("X")
      } else if (turn === "X") {
        setBoxes(() => {
          newBoxes[i] = "X";
          return newBoxes
        })
        // setTurn("O")
      }
      renewHistory(newBoxes)
    }
  }

  const moves = history.map((move, i) => {
    let description
    if (i > 0) {
      description = `Go to step ${i}`
    } else {
      description = "Go to game start"
    }
    return (
    <li key={i} onClick={() => {
      setCurrentMove(i)
      setBoxes(move)
    }}>{description}</li>)
})

  return (
    <div className="p-2 flex gap-6">
      <div>
        {winner ? <div className="pb-2">Winner: {winner}</div> : <div className="h-8"></div>}
        <div className="flex">
          {[0,1,2].map((box) => {
            return (
            <div className="h-16 w-16 flex justify-center items-center border" key={box} onClick={() => typeIn(box)}>{boxes[box]}</div>
          )})}
        </div>
        <div className="flex">
          {[3,4,5].map((box) => {
            return (
            <div className="h-16 w-16 flex justify-center items-center border" key={box} onClick={() => typeIn(box)}>{boxes[box]}</div>
          )})}
        </div>
        <div className="flex">
          {[6,7,8].map((box) => {
            return (
            <div className="h-16 w-16 flex justify-center items-center border" key={box} onClick={() => typeIn(box)}>{boxes[box]}</div>
          )})}
        </div>
      </div>
      <ol>{moves}</ol>
    </div>
  )
}
