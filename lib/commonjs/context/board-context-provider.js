"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BoardContext", {
  enumerable: true,
  get: function () {
    return _boardContext.BoardContext;
  }
});
Object.defineProperty(exports, "BoardSetterContext", {
  enumerable: true,
  get: function () {
    return _boardContext.BoardSetterContext;
  }
});
Object.defineProperty(exports, "ChessEngineContext", {
  enumerable: true,
  get: function () {
    return _chessEngineContext.ChessEngineContext;
  }
});
exports.ChessboardContextProvider = void 0;
var _chess = require("chess.js");
var _react = _interopRequireWildcard(require("react"));
var _useConst = require("../hooks/use-const");
var _boardContext = require("./board-context");
var _boardOperationsContext = require("./board-operations-context");
var _boardPromotionContext = require("./board-promotion-context");
var _boardRefsContext = require("./board-refs-context");
var _chessEngineContext = require("./chess-engine-context");
var _hooks = require("./props-context/hooks");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChessboardContextProviderComponent = /*#__PURE__*/_react.default.forwardRef(({
  children,
  fen
}, ref) => {
  const chess = (0, _useConst.useConst)(() => new _chess.Chess(fen));
  const chessboardRef = (0, _react.useRef)(null);
  const boardOperationsRef = (0, _react.useRef)(null);
  const {
    colors: {
      checkmateHighlight
    }
  } = (0, _hooks.useChessboardProps)();
  const [board, setBoard] = (0, _react.useState)(chess.board());
  const highlight = (0, _react.useCallback)(params => chessboardRef.current?.highlight(params), []);
  const findKing = (0, _react.useCallback)(type => {
    for (let x = 0; x < board.length; x++) {
      const row = board[x];
      for (let y = 0; y < row.length; y++) {
        const col = String.fromCharCode(97 + Math.round(x));

        // eslint-disable-next-line no-shadow
        const row = `${8 - Math.round(y)}`;
        const square = `${col}${row}`;
        const piece = chess.get(square);
        if (piece?.color === type.charAt(0) && piece.type === type.charAt(1)) return square;
      }
    }
    return null;
  }, [chess, board]);
  const checkIsCheckState = (0, _react.useCallback)(() => {
    const isCheck = chess.in_check();
    if (isCheck) {
      const square = findKing(`${chess.turn()}k`);
      if (!square) return;
      highlight({
        square,
        color: 'transparent',
        borderColor: checkmateHighlight
      });
    }
  }, [chess, findKing, highlight, checkmateHighlight]);
  const checkIsCheckMateState = (0, _react.useCallback)(() => {
    const isCheckmate = chess.in_checkmate();
    if (isCheckmate) {
      const square = findKing(`${chess.turn()}k`);
      if (!square) return;
      highlight({
        square,
        color: checkmateHighlight
      });
    }
  }, [chess, findKing, highlight, checkmateHighlight]);
  (0, _react.useEffect)(() => {
    if (fen) {
      checkIsCheckState();
      checkIsCheckMateState();
    }
    /*
     * here `eslint-disable-next-line` is used
     * because we would like this `useEffect` only triggered on `fen` changes,
     * but not the used callbacks updates
     * */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);
  const chessboardController = (0, _react.useMemo)(() => {
    return {
      move: params => chessboardRef.current?.move?.(params),
      highlight,
      resetAllHighlightedSquares: () => chessboardRef.current?.resetAllHighlightedSquares(),
      getState: () => chessboardRef?.current?.getState(),
      resetBoard: params => {
        chessboardRef.current?.resetBoard(params);
        boardOperationsRef.current?.reset();
      },
      undo: () => {
        chessboardRef.current?.undo();
        boardOperationsRef.current?.reset();
      }
    };
  }, [highlight]);
  const chessboardContextController = (0, _react.useMemo)(() => {
    return {
      findKing,
      checkIsCheckState,
      checkIsCheckMateState
    };
  }, [findKing, checkIsCheckState, checkIsCheckMateState]);
  (0, _react.useImperativeHandle)(ref, () => chessboardController, [chessboardController]);
  return /*#__PURE__*/_react.default.createElement(_boardContext.BoardContext.Provider, {
    value: board
  }, /*#__PURE__*/_react.default.createElement(_boardPromotionContext.BoardPromotionContextProvider, null, /*#__PURE__*/_react.default.createElement(_chessEngineContext.ChessEngineContext.Provider, {
    value: chess
  }, /*#__PURE__*/_react.default.createElement(_boardContext.BoardSetterContext.Provider, {
    value: setBoard
  }, /*#__PURE__*/_react.default.createElement(_boardOperationsContext.BoardOperationsContextProvider, {
    ref: boardOperationsRef,
    controller: chessboardController,
    contextController: chessboardContextController
  }, /*#__PURE__*/_react.default.createElement(_boardRefsContext.BoardRefsContextProvider, {
    ref: chessboardRef
  }, children))))));
});
const ChessboardContextProvider = exports.ChessboardContextProvider = /*#__PURE__*/_react.default.memo(ChessboardContextProviderComponent);
//# sourceMappingURL=board-context-provider.js.map