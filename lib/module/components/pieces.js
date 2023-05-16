import React from 'react';
import { useChessboardProps } from '../context/props-context/hooks';
import { useBoard } from '../context/board-context/hooks';
import { usePieceRefs } from '../context/board-refs-context/hooks';
import Piece from './piece';
import { useReversePiecePosition } from '../notation';
const Pieces = /*#__PURE__*/React.memo(() => {
  const board = useBoard();
  const refs = usePieceRefs();
  const {
    pieceSize
  } = useChessboardProps();
  const {
    toPosition,
    calculatePosition
  } = useReversePiecePosition();
  return /*#__PURE__*/React.createElement(React.Fragment, null, board.map((row, y) => row.map((piece, x) => {
    if (piece !== null) {
      var _refs$current;

      const {
        x: calculatedX,
        y: calculatedY
      } = calculatePosition({
        x,
        y
      });
      const square = toPosition({
        x: calculatedX * pieceSize,
        y: calculatedY * pieceSize
      });
      return /*#__PURE__*/React.createElement(Piece, {
        ref: refs === null || refs === void 0 ? void 0 : (_refs$current = refs.current) === null || _refs$current === void 0 ? void 0 : _refs$current[square],
        key: `${calculatedX}-${calculatedY}`,
        id: `${piece.color}${piece.type}`,
        startPosition: {
          x: calculatedX,
          y: calculatedY
        },
        square: square,
        size: pieceSize
      });
    }

    return null;
  })));
});
export { Pieces };
//# sourceMappingURL=pieces.js.map