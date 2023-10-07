import { Chess, Square } from 'chess.js';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ChessboardState } from '../helpers/get-chessboard-state';
import { useConst } from '../hooks/use-const';

import { BoardContext, BoardSetterContext } from './board-context';
import {
  BoardOperationsContextProvider,
  BoardOperationsRef,
} from './board-operations-context';
import { BoardPromotionContextProvider } from './board-promotion-context';
import {
  BoardRefsContextProvider,
  ChessboardContextRef,
  ChessboardRef,
} from './board-refs-context';
import { ChessEngineContext } from './chess-engine-context';
import { useChessboardProps } from './props-context/hooks';

type BoardContextProviderProps = {
  fen?: string;
  children?: React.ReactNode;
};

const ChessboardContextProviderComponent = React.forwardRef<
  ChessboardRef,
  BoardContextProviderProps
>(({ children, fen }, ref) => {
  const chess = useConst(() => new Chess(fen));
  const chessboardRef = useRef<ChessboardRef>(null);
  const boardOperationsRef = useRef<BoardOperationsRef>(null);
  const {
    colors: { checkmateHighlight },
  } = useChessboardProps();

  const [board, setBoard] = useState(chess.board());

  const highlight = useCallback(
    (params) => chessboardRef.current?.highlight(params),
    []
  );

  const findKing = useCallback(
    (type: 'wk' | 'bk') => {
      for (let x = 0; x < board.length; x++) {
        const row = board[x];
        for (let y = 0; y < row.length; y++) {
          const col = String.fromCharCode(97 + Math.round(x));

          // eslint-disable-next-line no-shadow
          const row = `${8 - Math.round(y)}`;
          const square = `${col}${row}` as Square;

          const piece = chess.get(square);
          if (piece?.color === type.charAt(0) && piece.type === type.charAt(1))
            return square;
        }
      }
      return null;
    },
    [chess, board]
  );

  const checkIsCheckState = useCallback(() => {
    const isCheck = chess.in_check();

    if (isCheck) {
      const square = findKing(`${chess.turn()}k`);
      if (!square) return;
      highlight({
        square,
        color: 'transparent',
        borderColor: checkmateHighlight,
      });
    }
  }, [chess, findKing, highlight, checkmateHighlight]);

  const checkIsCheckMateState = useCallback(() => {
    const isCheckmate = chess.in_checkmate();

    if (isCheckmate) {
      const square = findKing(`${chess.turn()}k`);
      if (!square) return;
      highlight({ square, color: checkmateHighlight });
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

  const chessboardController: ChessboardRef = useMemo(() => {
    return {
      move: (params) => chessboardRef.current?.move?.(params),
      highlight,
      resetAllHighlightedSquares: () =>
        chessboardRef.current?.resetAllHighlightedSquares(),
      getState: () => chessboardRef?.current?.getState() as ChessboardState,
      resetBoard: (params) => {
        chessboardRef.current?.resetBoard(params);
        boardOperationsRef.current?.reset();
      },
      undo: () => {
        chessboardRef.current?.undo();
        boardOperationsRef.current?.reset();
      },
    };
  }, [highlight]);

  const chessboardContextController: ChessboardContextRef = useMemo(() => {
    return {
      findKing,
      checkIsCheckState,
      checkIsCheckMateState,
    };
  }, [findKing, checkIsCheckState, checkIsCheckMateState]);

  useImperativeHandle(ref, () => chessboardController, [chessboardController]);

  return (
    <BoardContext.Provider value={board}>
      <BoardPromotionContextProvider>
        <ChessEngineContext.Provider value={chess}>
          <BoardSetterContext.Provider value={setBoard}>
            <BoardOperationsContextProvider
              ref={boardOperationsRef}
              controller={chessboardController}
              contextController={chessboardContextController}
            >
              <BoardRefsContextProvider ref={chessboardRef}>
                {children}
              </BoardRefsContextProvider>
            </BoardOperationsContextProvider>
          </BoardSetterContext.Provider>
        </ChessEngineContext.Provider>
      </BoardPromotionContextProvider>
    </BoardContext.Provider>
  );
});

const ChessboardContextProvider = React.memo(
  ChessboardContextProviderComponent
);
export {
  ChessboardContextProvider,
  ChessEngineContext,
  BoardContext,
  BoardSetterContext,
};
