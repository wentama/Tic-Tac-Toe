import React, { useState } from 'react';
import Board from './board';
import { win } from './rule';
import ScoreBoard from './scoreBoard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faUndo, faEraser } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { toast, ToastContainer } from 'react-nextjs-toast';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [yIsNext, setYIsNext] = useState(true);
  const [scores, setScores] = useState({ yScore: 0, wScore: 0 });
  const [endGame, setEndGame] = useState(false);
  const [oldBoard, setOldBoard] = useState(board);
  const [firstUndo, setFirstUndo] = useState(true);
  const [draw, setDraw] = useState(false);
  const winner = win(board);

  function handleClick(i) {
    const newBoard = [...board];
    setOldBoard(board);

    if (winner || newBoard[i]) {
      return;
    }

    newBoard[i] = yIsNext ? 'Y' : 'W';
    setFirstUndo(true);
    setBoard(newBoard);

    const endWinner = win(newBoard);
    if (endWinner) {
      if (endWinner === 'Y') {
        setScores({ ...scores, yScore: scores.yScore + 1 });
      } else {
        setScores({ ...scores, wScore: scores.wScore + 1 });
      }
      setEndGame(true);
      setFirstUndo(false);
    }

    if (!newBoard.includes(null)) {
      setDraw(true);
      setFirstUndo(false);
    }

    setYIsNext(!yIsNext);
  }

  function resetBoard() {
    setEndGame(false);
    setDraw(false);
    setFirstUndo(true);
    setBoard(Array(9).fill(null));
  }

  function undo() {
    if (!board.includes('Y') && !board.includes('W')) {
      toast.notify('No move has been made yet...', {
        duration: 2,
        type: 'error',
      });
    } else if (firstUndo === true && !winner) {
      setBoard(oldBoard);
      setYIsNext(!yIsNext);
      setFirstUndo(false);
    } else {
      toast.notify('You have already undone a move this round...', {
        duration: 2,
        type: 'error',
      });
    }
  }

  function clearScore() {
    setScores({ yScore: 0, wScore: 0 });
    resetBoard();
  }

  function surrender() {
    if (!board.includes('Y') && !board.includes('W')) {
      toast.notify('Please make a move before surrendering...', {
        duration: 2,
        type: 'error',
      });
    } else if (!winner) {
      if (yIsNext) {
        setScores({ ...scores, wScore: scores.wScore + 1 });
      } else {
        setScores({ ...scores, yScore: scores.yScore + 1 });
      }
      resetBoard();
    } else {
      toast.notify('One player has already won the game...', {
        duration: 2,
        type: 'error',
      });
    }
    setYIsNext(!yIsNext);
  }

  return (
    <>
      <ToastContainer />
      <Dialog open={endGame} onClose={resetBoard}>
        <DialogContent className={winner === 'Y' ? 'yEndScreen' : 'wEndScreen'}>
          {' '}
          {winner} won!
        </DialogContent>
        <DialogActions style={{ align: 'center' }}>
          <div onClick={resetBoard} className="buttons">
            <FontAwesomeIcon icon={faRefresh} /> New Game
          </div>
        </DialogActions>
      </Dialog>
      <Dialog open={draw} onClose={resetBoard}>
        <DialogContent className="drawScreen">
          {' '}
          The game was tied!{' '}
        </DialogContent>
        <DialogActions style={{ align: 'center' }}>
          <div onClick={resetBoard} className="buttons">
            <FontAwesomeIcon icon={faRefresh} /> New Game
          </div>
        </DialogActions>
      </Dialog>
      <ScoreBoard scores={scores} yIsNext={yIsNext} />
      <Board
        squares={board}
        clickSq={endGame ? resetBoard : handleClick}
        yIsNext={yIsNext}
      />
      <div className="optionButtons">
        <button onClick={resetBoard} className="buttons">
          <FontAwesomeIcon icon={faRefresh} /> Restart{' '}
        </button>
        <button onClick={undo} className="buttons">
          <FontAwesomeIcon icon={faUndo} /> Undo{' '}
        </button>
        <button onClick={clearScore} className="buttons">
          <FontAwesomeIcon icon={faEraser} /> Clear Score{' '}
        </button>
        <button onClick={surrender} className="buttons">
          <FontAwesomeIcon icon={faFlag} /> Surrender{' '}
        </button>
      </div>
    </>
  );
}
