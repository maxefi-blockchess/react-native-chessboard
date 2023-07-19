"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReversePiecePosition = void 0;

var _react = require("react");

var _hooks = require("./context/props-context/hooks");

var _hooks2 = require("./context/board-context/hooks");

const useReversePiecePosition = () => {
  const {
    pieceSize,
    playersColor
  } = (0, _hooks.useChessboardProps)();
  const board = (0, _hooks2.useBoard)();
  const isWhitePiecePosition = (0, _react.useMemo)(() => playersColor === 'w', [playersColor]);
  const calculateCol = (0, _react.useCallback)(col => {
    'worklet';

    return isWhitePiecePosition ? 97 + col : 104 - col;
  }, [isWhitePiecePosition]);
  const calculateRow = (0, _react.useCallback)(row => {
    'worklet';

    return isWhitePiecePosition ? 8 - row : row + 1;
  }, [isWhitePiecePosition]);
  const calculatePosition = (0, _react.useCallback)(_ref => {
    'worklet';

    let {
      x,
      y
    } = _ref;
    const rowLendth = board[0].length;

    if (isWhitePiecePosition) {
      return {
        x,
        y
      };
    }

    return {
      x: rowLendth - 1 - x,
      y: board.length - 1 - y
    };
  }, [board, isWhitePiecePosition]);
  const toTranslation = (0, _react.useCallback)(to => {
    'worklet';

    const tokens = to.split('');
    const col = tokens[0];
    const row = tokens[1];

    if (!col || !row) {
      throw new Error('Invalid notation: ' + to);
    }

    const x = isWhitePiecePosition ? col.charCodeAt(0) - 'a'.charCodeAt(0) : 'h'.charCodeAt(0) - col.charCodeAt(0);
    const indexes = {
      x,
      y: parseInt(row, 10) - 1
    };
    const y = isWhitePiecePosition ? 7 * pieceSize - indexes.y * pieceSize : indexes.y * pieceSize + 1;
    return {
      x: indexes.x * pieceSize,
      y
    };
  }, [pieceSize, isWhitePiecePosition]);
  const toPosition = (0, _react.useCallback)(_ref2 => {
    'worklet';

    let {
      x,
      y
    } = _ref2;
    const col = String.fromCharCode(calculateCol(Math.round(x / pieceSize)));
    const row = `${calculateRow(Math.round(y / pieceSize))}`;
    return `${col}${row}`;
  }, [pieceSize, calculateCol, calculateRow]);
  return {
    toPosition,
    toTranslation,
    calculateCol,
    calculateRow,
    calculatePosition,
    isWhitePiecePosition
  };
};

exports.useReversePiecePosition = useReversePiecePosition;
//# sourceMappingURL=notation.js.map