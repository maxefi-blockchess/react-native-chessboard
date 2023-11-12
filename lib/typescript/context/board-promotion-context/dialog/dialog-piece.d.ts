import type { PieceType } from 'chess.js';
import React from 'react';
import type { Player } from '../../../types';
type DialogPieceProps = {
    index: number;
    width: number;
    type: Player;
    piece: PieceType;
    onSelectPiece?: (piece: PieceType) => void;
};
declare const DialogPiece: React.FC<DialogPieceProps>;
export { DialogPiece };
//# sourceMappingURL=dialog-piece.d.ts.map