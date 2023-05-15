import type { Square } from 'chess.js';
import { useCallback, useMemo } from 'react';
import { useChessboardProps } from './context/props-context/hooks';
import { useBoard } from './context/board-context/hooks';

import type { Vector } from './types';

const useReversePiecePosition = () => {
  const { pieceSize, playersColor } = useChessboardProps();
  const board = useBoard();

  const isPlayingWhite = useMemo(() => playersColor === 'w', [playersColor]);

  const calculateCol = useCallback(
    (col: number) => {
      'worklet';
      return isPlayingWhite ? 97 + col : 104 - col;
    },
    [isPlayingWhite]
  );

  const calculateRow = useCallback(
    (row: number) => {
      'worklet';
      return isPlayingWhite ? 8 - row : row + 1;
    },
    [isPlayingWhite]
  );

  const calculatePosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet';
      const rowLendth = board[0].length;

      if (isPlayingWhite) {
        return { x, y };
      }

      return {
        x: rowLendth - 1 - x,
        y: board.length - 1 - y,
      };
    },
    [board, isPlayingWhite]
  );

  const toTranslation = useCallback(
    (to: Square) => {
      'worklet';
      const tokens = to.split('');
      const col = tokens[0];
      const row = tokens[1];
      if (!col || !row) {
        throw new Error('Invalid notation: ' + to);
      }

      const x = isPlayingWhite
        ? col.charCodeAt(0) - 'a'.charCodeAt(0)
        : 'h'.charCodeAt(0) - col.charCodeAt(0);

      const indexes = {
        x,
        y: parseInt(row, 10) - 1,
      };

      const y = isPlayingWhite
        ? 7 * pieceSize - indexes.y * pieceSize
        : indexes.y * pieceSize + 1;

      return {
        x: indexes.x * pieceSize,
        y,
      };
    },
    [pieceSize, isPlayingWhite]
  );

  const toPosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet';
      const col = String.fromCharCode(calculateCol(Math.round(x / pieceSize)));
      const row = `${calculateRow(Math.round(y / pieceSize))}`;
      return `${col}${row}` as Square;
    },
    [pieceSize, calculateCol, calculateRow]
  );

  return {
    toPosition,
    toTranslation,
    calculateCol,
    calculateRow,
    calculatePosition,
  };
};

export { useReversePiecePosition };
