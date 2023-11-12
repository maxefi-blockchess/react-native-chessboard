"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SquareRefsContext = exports.PieceRefsContext = exports.BoardRefsContextProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _getChessboardState = require("../../helpers/get-chessboard-state");
var _hooks = require("../chess-engine-context/hooks");
var _hooks2 = require("../board-context/hooks");
var _hooks3 = require("../board-operations-context/hooks");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PieceRefsContext = exports.PieceRefsContext = /*#__PURE__*/(0, _react.createContext)(null);
const SquareRefsContext = exports.SquareRefsContext = /*#__PURE__*/(0, _react.createContext)(null);
const BoardRefsContextProviderComponent = /*#__PURE__*/_react.default.forwardRef(({
  children
}, ref) => {
  const chess = (0, _hooks.useChessEngine)();
  const board = chess.board();
  const setBoard = (0, _hooks2.useSetBoard)();
  const {
    moveProgrammatically
  } = (0, _hooks3.useBoardOperations)();

  // There must be a better way of doing this.
  const generateBoardRefs = (0, _react.useCallback)(() => {
    let acc = {};
    for (let x = 0; x < board.length; x++) {
      const row = board[x];
      for (let y = 0; y < row.length; y++) {
        const col = String.fromCharCode(97 + Math.round(x));
        // eslint-disable-next-line no-shadow
        const row = `${8 - Math.round(y)}`;
        const square = `${col}${row}`;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        acc = {
          ...acc,
          [square]: (0, _react.useRef)(null)
        };
      }
    }
    return acc;
  }, [board]);
  const pieceRefs = (0, _react.useRef)(generateBoardRefs());
  const squareRefs = (0, _react.useRef)(generateBoardRefs());
  (0, _react.useImperativeHandle)(ref, () => ({
    move: ({
      from,
      to,
      promotionPiece
    }) => {
      if (promotionPiece) {
        moveProgrammatically(from, to, promotionPiece);
      }
      return pieceRefs?.current?.[from].current?.moveTo?.(to);
    },
    highlight: ({
      square,
      color,
      borderColor
    }) => {
      squareRefs.current?.[square].current.highlight({
        backgroundColor: color,
        borderColor
      });
    },
    resetAllHighlightedSquares: () => {
      for (let x = 0; x < board.length; x++) {
        const row = board[x];
        for (let y = 0; y < row.length; y++) {
          const col = String.fromCharCode(97 + Math.round(x));
          // eslint-disable-next-line no-shadow
          const row = `${8 - Math.round(y)}`;
          const square = `${col}${row}`;
          squareRefs.current?.[square].current.reset();
        }
      }
    },
    getState: () => {
      return (0, _getChessboardState.getChessboardState)(chess);
    },
    resetBoard: fen => {
      chess.reset();
      if (fen) chess.load(fen);
      setBoard(chess.board());
    },
    undo: () => {
      chess.undo();
      setBoard(chess.board());
    }
  }), [moveProgrammatically, board, chess, setBoard]);
  return /*#__PURE__*/_react.default.createElement(PieceRefsContext.Provider, {
    value: pieceRefs
  }, /*#__PURE__*/_react.default.createElement(SquareRefsContext.Provider, {
    value: squareRefs
  }, children));
});
const BoardRefsContextProvider = exports.BoardRefsContextProvider = /*#__PURE__*/_react.default.memo(BoardRefsContextProviderComponent);
//# sourceMappingURL=index.js.map