import React from 'react';

export default function Square({ value, onClick, yIsNext }) {
  return (
    <button
      onClick={onClick}
      className={value === 'Y' ? 'ySquare' : value === 'W' ? 'wSquare' : yIsNext === true ? 'ySquare' : 'wSquare'}
    >
      {value}
    </button>
  );
}
