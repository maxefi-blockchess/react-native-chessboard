import type { Square } from 'chess.js';
import type { Vector } from './types';
declare const useReversePiecePosition: () => {
    toPosition: ({ x, y }: Vector) => Square;
    toTranslation: (to: Square) => {
        x: number;
        y: number;
    };
    calculateCol: (col: number) => number;
    calculateRow: (row: number) => number;
    calculatePosition: ({ x, y }: Vector) => {
        x: number;
        y: number;
    };
    isWhitePiecePosition: boolean;
};
export { useReversePiecePosition };
