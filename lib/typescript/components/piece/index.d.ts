import type { Move, Square } from 'chess.js';
import React from 'react';
import type { PieceType, Vector } from '../../types';
type PieceProps = {
    id: PieceType;
    startPosition: Vector;
    square: Square;
    size: number;
};
export type ChessPieceRef = {
    moveTo: (square: Square) => Promise<Move | undefined>;
    enable: (activate: boolean) => void;
};
declare const Piece: React.MemoExoticComponent<React.ForwardRefExoticComponent<PieceProps & React.RefAttributes<ChessPieceRef>>>;
export default Piece;
//# sourceMappingURL=index.d.ts.map