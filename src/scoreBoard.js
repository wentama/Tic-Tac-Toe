import React from 'react';

export default function ScoreBoard({scores, yIsNext}) {
  const {yScore, wScore} = scores;
  return (
    <div className="scoreBoard">
      <span className={`score yScore ${!yIsNext && "inactive"}`}>  Y wins: {yScore} </span>
      <span className={`score wScore ${yIsNext && "inactive"}`}> W wins: {wScore} </span>
    </div>
  )
}