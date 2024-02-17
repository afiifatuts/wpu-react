/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'

function Square({value, onSquareClick}) {


  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

 function Board() {

  //Lifting State Up
  const [squares, setSquares] = useState(Array(9).fill(null))

  //menentukan giliran
  // const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(squares);
// console.log(winner);

  let status = '';
  if(winner){
    status ='Winner : '+winner
  }else{
    status ='Next player ' + (xIsNext?'X':'O')
  }
  //parameter index
  function handleClick(i) {

    //cek apakah ada pemenangnya 
    if(squares[i]||calculateWinner(squares)) return

    //cek dulu apakah buttonya ada isinya
    //kalau ada supaya diclick tidak berubah ubah lagi valuenya di return true spy keluar dari functionnya 
    if(squares[i]){
      return
    }
    //membuat array baru
    //immutability
    //slice= untuk mengcopy array pertama
    const nextSquares = squares.slice()
    // console.log(nextSquares)

    //cek gilirannya 
    if(xIsNext){
      nextSquares[i] = 'X';
    }else{
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    //di akhir function ubah state xIsNext menjadi kebalikannya supaya bergantian
    setXIsNext(!xIsNext)
  }

  return (
    //onSquareClicknya pakai arrow function supaya functionnya jalan hanya ketika di click
    <>
    <div className="status">{status}</div>
    <div className='board'>
      <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
    </div></>
  )
}

export default function Game(){

  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])

  return (
    <div className='game'>
      <div className="game-board">
        <Board/>
      </div>
      <div className="game-info">
        <ol></ol>
      </div>
    </div>
  )
}


function calculateWinner(squares) {

  const lines =[
    //secara horizontal 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //secara vertikal
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // secara diagonal
    [0,4,8],
    [2,4,6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];

    if(squares[a]&& squares[a]===squares[b]&&squares[c]){
      return squares[a]
    }
    
  }

  return false


}