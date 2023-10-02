import type { PieceType, Square } from 'chess.js';
import React, {
  createContext,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type Animated from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { getChessboardState } from '../../helpers/get-chessboard-state';

import { useReversePiecePosition } from '../../notation';
import { useSetBoard } from '../board-context/hooks';
import { useBoardPromotion } from '../board-promotion-context/hooks';
import type {
  ChessboardContextRef,
  ChessboardRef,
} from '../board-refs-context';
import { usePieceRefs } from '../board-refs-context/hooks';
import { useChessEngine } from '../chess-engine-context/hooks';
import { useChessboardProps } from '../props-context/hooks';

type BoardOperationsContextType = {
  selectableSquares: Animated.SharedValue<Square[]>;
  onMove: (from: Square, to: Square) => void;
  onSelectPiece: (square: Square) => void;
  moveTo: (to: Square) => void;
  isPromoting: (from: Square, to: Square) => boolean;
  selectedSquare: Animated.SharedValue<Square | null>;
  turn: Animated.SharedValue<'w' | 'b'>;
  moveProgrammatically: (
    from: Square,
    to: Square,
    promotionPiece?: PieceType
  ) => void;
  isPieceGestureInProgress: boolean;
  setIsPieceGestureInProgress: (value: boolean) => void;
};

const BoardOperationsContext = createContext<BoardOperationsContextType>(
  {} as any
);

export type BoardOperationsRef = {
  reset: () => void;
};

const BoardOperationsContextProviderComponent = React.forwardRef<
  BoardOperationsRef,
  {
    controller?: ChessboardRef;
    contextController?: ChessboardContextRef;
    children?: React.ReactNode;
  }
>(({ children, controller, contextController }, ref) => {
  const chess = useChessEngine();
  const setBoard = useSetBoard();
  const {
    pieceSize,
    onMove: onChessboardMoveCallback,
    playersColor,
  } = useChessboardProps();
  const { toTranslation, calculatePosition, isWhitePiecePosition } =
    useReversePiecePosition();
  const selectableSquares = useSharedValue<Square[]>([]);
  const selectedSquare = useSharedValue<Square | null>(null);
  const { showPromotionDialog } = useBoardPromotion();
  const pieceRefs = usePieceRefs();
  const [isPieceGestureInProgress, setIsPieceGestureInProgress] =
    useState<boolean>(false);

  const turn = useSharedValue(chess.turn());

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        selectableSquares.value = [];
        controller?.resetAllHighlightedSquares();
        turn.value = chess.turn();
      },
    }),
    [chess, controller, selectableSquares, turn]
  );

  const isPromoting = useCallback(
    (from: Square, to: Square) => {
      if (!to.includes('8') && !to.includes('1')) return false;

      const val = toTranslation(from);
      const x = Math.floor(val.x / pieceSize);
      const y = Math.floor(val.y / pieceSize);

      const { x: calculatedX, y: calculatedY } = calculatePosition({
        x,
        y,
      });

      const piece = chess.board()[calculatedY][calculatedX];

      return (
        piece?.type === chess.PAWN &&
        ((to.includes('8') && piece.color === chess.WHITE) ||
          (to.includes('1') && piece.color === chess.BLACK))
      );
    },
    [chess, pieceSize, toTranslation, calculatePosition]
  );

  const moveProgrammatically = useCallback(
    (from: Square, to: Square, promotionPiece?: PieceType) => {
      const move = chess.move({
        from,
        to,
        promotion: promotionPiece as any,
      });

      turn.value = chess.turn();

      if (move == null) return;

      contextController?.checkIsCheckState();
      contextController?.checkIsCheckMateState();

      onChessboardMoveCallback?.({
        move,
        state: {
          ...getChessboardState(chess),
          in_promotion: promotionPiece != null,
        },
      });

      setBoard(chess.board());
    },
    [chess, contextController, onChessboardMoveCallback, setBoard, turn]
  );

  const onMove = useCallback(
    (from: Square, to: Square) => {
      selectableSquares.value = [];
      selectedSquare.value = null;
      const lastMove = { from, to };
      controller?.resetAllHighlightedSquares();
      controller?.highlight({ square: lastMove.from });
      controller?.highlight({ square: lastMove.to });

      const in_promotion = isPromoting(from, to);
      if (!in_promotion) {
        moveProgrammatically(from, to);
        return;
      }

      const chessTurn = chess.turn();

      if (chessTurn === playersColor) {
        pieceRefs?.current?.[to]?.current?.enable(false);
        showPromotionDialog({
          type: chessTurn,
          onSelect: (piece) => {
            moveProgrammatically(from, to, piece);
            pieceRefs?.current?.[to]?.current?.enable(true);
          },
        });
      }
    },
    [
      chess,
      controller,
      isPromoting,
      moveProgrammatically,
      pieceRefs,
      selectableSquares,
      selectedSquare,
      showPromotionDialog,
      playersColor,
    ]
  );

  const onSelectPiece = useCallback(
    (square: Square) => {
      selectedSquare.value = square;

      const validSquares = (chess.moves({
        square,
      }) ?? []) as Square[];

      // eslint-disable-next-line no-shadow
      selectableSquares.value = validSquares.map((square) => {
        const splittedSquare = square.split('x');
        if (splittedSquare.length === 0) {
          return square;
        }

        const splittedSquareValue = splittedSquare[splittedSquare.length - 1];

        if (splittedSquareValue === 'O-O') {
          if (isWhitePiecePosition) {
            return 'Kg1' as Square;
          }

          return 'Kg8' as Square;
        }

        if (splittedSquareValue === 'O-O-O') {
          if (isWhitePiecePosition) {
            return 'Kc1' as Square;
          }

          return 'Kc8' as Square;
        }

        return splittedSquare[splittedSquare.length - 1] as Square;
      });
    },
    [chess, selectableSquares, selectedSquare, isWhitePiecePosition]
  );

  const moveTo = useCallback(
    (to: Square) => {
      if (selectedSquare.value != null) {
        controller?.move({ from: selectedSquare.value, to: to });
        return true;
      }
      return false;
    },
    [controller, selectedSquare.value]
  );

  const value = useMemo(() => {
    return {
      onMove,
      onSelectPiece,
      moveTo,
      selectableSquares,
      selectedSquare,
      isPromoting,
      turn,
      moveProgrammatically,
      isPieceGestureInProgress,
      setIsPieceGestureInProgress,
    };
  }, [
    isPromoting,
    moveTo,
    onMove,
    onSelectPiece,
    selectableSquares,
    selectedSquare,
    turn,
    moveProgrammatically,
    isPieceGestureInProgress,
    setIsPieceGestureInProgress,
  ]);

  return (
    <BoardOperationsContext.Provider value={value}>
      {children}
    </BoardOperationsContext.Provider>
  );
});

const BoardOperationsContextProvider = React.memo(
  BoardOperationsContextProviderComponent
);

export { BoardOperationsContextProvider, BoardOperationsContext };
