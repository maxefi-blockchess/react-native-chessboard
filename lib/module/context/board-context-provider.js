import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useConst } from '../hooks/use-const';
import { BoardContext, BoardSetterContext } from './board-context';
import { BoardOperationsContextProvider } from './board-operations-context';
import { BoardPromotionContextProvider } from './board-promotion-context';
import { BoardRefsContextProvider } from './board-refs-context';
import { ChessEngineContext } from './chess-engine-context';
import { useChessboardProps } from './props-context/hooks';
const ChessboardContextProviderComponent = /*#__PURE__*/React.forwardRef(({
  children,
  fen
}, ref) => {
  const chess = useConst(() => new Chess(fen));
  const chessboardRef = useRef(null);
  const boardOperationsRef = useRef(null);
  const {
    colors: {
      checkmateHighlight
    }
  } = useChessboardProps();
  const [board, setBoard] = useState(chess.board());
  const highlight = useCallback(params => chessboardRef.current?.highlight(params), []);
  const findKing = useCallback(type => {
    for (let x = 0; x < board.length; x++) {
      const row = board[x];
      for (let y = 0; y < row.length; y++) {
        const col = String.fromCharCode(97 + Math.round(x));

        // eslint-disable-next-line no-shadow
        const row = `${8 - Math.round(y)}`;
        const square = `${col}${row}`;
        const piece = chess.get(square);
        if (piece?.color === type.charAt(0) && piece.type === type.charAt(1)) return square;
      }
    }
    return null;
  }, [chess, board]);
  const checkIsCheckState = useCallback(() => {
    const isCheck = chess.in_check();
    if (isCheck) {
      const square = findKing(`${chess.turn()}k`);
      if (!square) return;
      highlight({
        square,
        color: 'transparent',
        borderColor: checkmateHighlight
      });
    }
  }, [chess, findKing, highlight, checkmateHighlight]);
  const checkIsCheckMateState = useCallback(() => {
    const isCheckmate = chess.in_checkmate();
    if (isCheckmate) {
      const square = findKing(`${chess.turn()}k`);
      if (!square) return;
      highlight({
        square,
        color: checkmateHighlight
      });
    }
  }, [chess, findKing, highlight, checkmateHighlight]);
  useEffect(() => {
    if (fen) {
      checkIsCheckState();
      checkIsCheckMateState();
    }
    /*
     * here `eslint-disable-next-line` is used
     * because we would like this `useEffect` only triggered on `fen` changes,
     * but not the used callbacks updates
     * */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);
  const chessboardController = useMemo(() => {
    return {
      move: params => chessboardRef.current?.move?.(params),
      highlight,
      resetAllHighlightedSquares: () => chessboardRef.current?.resetAllHighlightedSquares(),
      getState: () => chessboardRef?.current?.getState(),
      resetBoard: params => {
        chessboardRef.current?.resetBoard(params);
        boardOperationsRef.current?.reset();
      },
      undo: () => {
        chessboardRef.current?.undo();
        boardOperationsRef.current?.reset();
      }
    };
  }, [highlight]);
  const chessboardContextController = useMemo(() => {
    return {
      findKing,
      checkIsCheckState,
      checkIsCheckMateState
    };
  }, [findKing, checkIsCheckState, checkIsCheckMateState]);
  useImperativeHandle(ref, () => chessboardController, [chessboardController]);
  return /*#__PURE__*/React.createElement(BoardContext.Provider, {
    value: board
  }, /*#__PURE__*/React.createElement(BoardPromotionContextProvider, null, /*#__PURE__*/React.createElement(ChessEngineContext.Provider, {
    value: chess
  }, /*#__PURE__*/React.createElement(BoardSetterContext.Provider, {
    value: setBoard
  }, /*#__PURE__*/React.createElement(BoardOperationsContextProvider, {
    ref: boardOperationsRef,
    controller: chessboardController,
    contextController: chessboardContextController
  }, /*#__PURE__*/React.createElement(BoardRefsContextProvider, {
    ref: chessboardRef
  }, children))))));
});
const ChessboardContextProvider = /*#__PURE__*/React.memo(ChessboardContextProviderComponent);
export { ChessboardContextProvider, ChessEngineContext, BoardContext, BoardSetterContext };
//# sourceMappingURL=board-context-provider.js.map