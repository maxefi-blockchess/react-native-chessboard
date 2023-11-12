import React, { createContext, useCallback, useImperativeHandle, useRef } from 'react';
import { getChessboardState } from '../../helpers/get-chessboard-state';
import { useChessEngine } from '../chess-engine-context/hooks';
import { useSetBoard } from '../board-context/hooks';
import { useBoardOperations } from '../board-operations-context/hooks';
const PieceRefsContext = /*#__PURE__*/createContext(null);
const SquareRefsContext = /*#__PURE__*/createContext(null);
const BoardRefsContextProviderComponent = /*#__PURE__*/React.forwardRef(({
  children
}, ref) => {
  const chess = useChessEngine();
  const board = chess.board();
  const setBoard = useSetBoard();
  const {
    moveProgrammatically
  } = useBoardOperations();

  // There must be a better way of doing this.
  const generateBoardRefs = useCallback(() => {
    let acc = {};
    for (let x = 0; x < board.length; x++) {
      const row = board[x];
      for (let y = 0; y < row.length; y++) {
        const col = String.fromCharCode(97 + Math.round(x));
        // eslint-disable-next-line no-shadow
        const row = `${8 - Math.round(y)}`;
        const square = `${col}${row}`;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        acc = {
          ...acc,
          [square]: useRef(null)
        };
      }
    }
    return acc;
  }, [board]);
  const pieceRefs = useRef(generateBoardRefs());
  const squareRefs = useRef(generateBoardRefs());
  useImperativeHandle(ref, () => ({
    move: ({
      from,
      to,
      promotionPiece
    }) => {
      if (promotionPiece) {
        moveProgrammatically(from, to, promotionPiece);
      }
      return pieceRefs?.current?.[from].current?.moveTo?.(to);
    },
    highlight: ({
      square,
      color,
      borderColor
    }) => {
      squareRefs.current?.[square].current.highlight({
        backgroundColor: color,
        borderColor
      });
    },
    resetAllHighlightedSquares: () => {
      for (let x = 0; x < board.length; x++) {
        const row = board[x];
        for (let y = 0; y < row.length; y++) {
          const col = String.fromCharCode(97 + Math.round(x));
          // eslint-disable-next-line no-shadow
          const row = `${8 - Math.round(y)}`;
          const square = `${col}${row}`;
          squareRefs.current?.[square].current.reset();
        }
      }
    },
    getState: () => {
      return getChessboardState(chess);
    },
    resetBoard: fen => {
      chess.reset();
      if (fen) chess.load(fen);
      setBoard(chess.board());
    },
    undo: () => {
      chess.undo();
      setBoard(chess.board());
    }
  }), [moveProgrammatically, board, chess, setBoard]);
  return /*#__PURE__*/React.createElement(PieceRefsContext.Provider, {
    value: pieceRefs
  }, /*#__PURE__*/React.createElement(SquareRefsContext.Provider, {
    value: squareRefs
  }, children));
});
const BoardRefsContextProvider = /*#__PURE__*/React.memo(BoardRefsContextProviderComponent);
export { PieceRefsContext, SquareRefsContext, BoardRefsContextProvider };
//# sourceMappingURL=index.js.map