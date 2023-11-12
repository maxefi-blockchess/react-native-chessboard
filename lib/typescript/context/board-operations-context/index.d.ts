import type { PieceType, Square } from 'chess.js';
import React from 'react';
import type Animated from 'react-native-reanimated';
import type { ChessboardContextRef, ChessboardRef } from '../board-refs-context';
type BoardOperationsContextType = {
    selectableSquares: Animated.SharedValue<Square[]>;
    onMove: (from: Square, to: Square) => void;
    onSelectPiece: (square: Square) => void;
    moveTo: (to: Square) => void;
    isPromoting: (from: Square, to: Square) => boolean;
    selectedSquare: Animated.SharedValue<Square | null>;
    turn: Animated.SharedValue<'w' | 'b'>;
    moveProgrammatically: (from: Square, to: Square, promotionPiece?: PieceType) => void;
    isPieceGestureInProgress: boolean;
    setIsPieceGestureInProgress: (value: boolean) => void;
};
declare const BoardOperationsContext: React.Context<BoardOperationsContextType>;
export type BoardOperationsRef = {
    reset: () => void;
};
declare const BoardOperationsContextProvider: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    controller?: ChessboardRef | undefined;
    contextController?: ChessboardContextRef | undefined;
    children?: React.ReactNode;
} & React.RefAttributes<BoardOperationsRef>>>;
export { BoardOperationsContextProvider, BoardOperationsContext };
//# sourceMappingURL=index.d.ts.map