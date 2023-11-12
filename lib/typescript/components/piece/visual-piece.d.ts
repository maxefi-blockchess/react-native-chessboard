import React from 'react';
import { ImageProps } from 'react-native';
import type { PieceType } from '../../types';
type ChessPieceType = {
    id: PieceType;
} & Partial<ImageProps>;
declare const ChessPiece: React.FC<ChessPieceType>;
export { ChessPiece };
//# sourceMappingURL=visual-piece.d.ts.map