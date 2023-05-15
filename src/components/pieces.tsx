import React from 'react';
import { useChessboardProps } from '../context/props-context/hooks';

import { useBoard } from '../context/board-context/hooks';
import { usePieceRefs } from '../context/board-refs-context/hooks';

import Piece from './piece';
import { useReversePiecePosition } from '../notation';

const Pieces = React.memo(() => {
  const board = useBoard();
  const refs = usePieceRefs();
  const { pieceSize } = useChessboardProps();
  const { toPosition, calculatePosition } = useReversePiecePosition();

  return (
    <>
      {board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            const { x: calculatedX, y: calculatedY } = calculatePosition({
              x,
              y,
            });

            const square = toPosition({
              x: calculatedX * pieceSize,
              y: calculatedY * pieceSize,
            });

            return (
              <Piece
                ref={refs?.current?.[square]}
                key={`${calculatedX}-${calculatedY}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={{ x: calculatedX, y: calculatedY }}
                square={square}
                size={pieceSize}
              />
            );
          }
          return null;
        })
      )}
    </>
  );
});

export { Pieces };
