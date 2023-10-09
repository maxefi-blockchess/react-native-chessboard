import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useConst } from '../hooks/use-const';
import { BoardContext, BoardSetterContext } from './board-context';
import { BoardOperationsContextProvider } from './board-operations-context';
import { BoardPromotionContextProvider } from './board-promotion-context';
import { BoardRefsContextProvider } from './board-refs-context';
import { ChessEngineContext } from './chess-engine-context';
import { useChessboardProps } from './props-context/hooks';
const ChessboardContextProviderComponent = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    fen
  } = _ref;
  const chess = useConst(() => new Chess(fen));
  const chessboardRef = useRef(null);
  const boardOperationsRef = useRef(null);
  const {
    colors: {
      checkmateHighlight
    }
  } = useChessboardProps();
  const [board, setBoard] = useState(chess.board());
  const highlight = useCallback(params => {
    var _chessboardRef$curren;

    return (_chessboardRef$curren = chessboardRef.current) === null || _chessboardRef$curren === void 0 ? void 0 : _chessboardRef$curren.highlight(params);
  }, []);
  const findKing = useCallback(type => {
    for (let x = 0; x < board.length; x++) {
      const row = board[x];

      for (let y = 0; y < row.length; y++) {
        const col = String.fromCharCode(97 + Math.round(x)); // eslint-disable-next-line no-shadow

        const row = `${8 - Math.round(y)}`;
        const square = `${col}${row}`;
        const piece = chess.get(square);
        if ((piece === null || piece === void 0 ? void 0 : piece.color) === type.charAt(0) && piece.type === type.charAt(1)) return square;
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
      move: params => {
        var _chessboardRef$curren2, _chessboardRef$curren3;

        return (_chessboardRef$curren2 = chessboardRef.current) === null || _chessboardRef$curren2 === void 0 ? void 0 : (_chessboardRef$curren3 = _chessboardRef$curren2.move) === null || _chessboardRef$curren3 === void 0 ? void 0 : _chessboardRef$curren3.call(_chessboardRef$curren2, params);
      },
      highlight,
      resetAllHighlightedSquares: () => {
        var _chessboardRef$curren4;

        return (_chessboardRef$curren4 = chessboardRef.current) === null || _chessboardRef$curren4 === void 0 ? void 0 : _chessboardRef$curren4.resetAllHighlightedSquares();
      },
      getState: () => {
        var _chessboardRef$curren5;

        return chessboardRef === null || chessboardRef === void 0 ? void 0 : (_chessboardRef$curren5 = chessboardRef.current) === null || _chessboardRef$curren5 === void 0 ? void 0 : _chessboardRef$curren5.getState();
      },
      resetBoard: params => {
        var _chessboardRef$curren6, _boardOperationsRef$c;

        (_chessboardRef$curren6 = chessboardRef.current) === null || _chessboardRef$curren6 === void 0 ? void 0 : _chessboardRef$curren6.resetBoard(params);
        (_boardOperationsRef$c = boardOperationsRef.current) === null || _boardOperationsRef$c === void 0 ? void 0 : _boardOperationsRef$c.reset();
      },
      undo: () => {
        var _chessboardRef$curren7, _boardOperationsRef$c2;

        (_chessboardRef$curren7 = chessboardRef.current) === null || _chessboardRef$curren7 === void 0 ? void 0 : _chessboardRef$curren7.undo();
        (_boardOperationsRef$c2 = boardOperationsRef.current) === null || _boardOperationsRef$c2 === void 0 ? void 0 : _boardOperationsRef$c2.reset();
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