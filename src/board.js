import React from 'react';
import Square from './square';

export default function Board({ squares, clickSq, yIsNext }) {
  return (
    <div className='board'>
      {squares.map((square, i) => {
        return <Square key={i} value={square} onClick={() => clickSq(i)} yIsNext={yIsNext} />;
      })}
    </div>
  );
}
