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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ChessboardContextProviderComponent = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    fen
  } = _ref;
  const chess = (0, _useConst.useConst)(() => new _chess.Chess(fen));
  const chessboardRef = (0, _react.useRef)(null);
  const boardOperationsRef = (0, _react.useRef)(null);
  const {
    colors: {
      checkmateHighlight
    }
  } = (0, _hooks.useChessboardProps)();
  const [board, setBoard] = (0, _react.useState)(chess.board());
  const highlight = (0, _react.useCallback)(params => {
    var _chessboardRef$curren;

    return (_chessboardRef$curren = chessboardRef.current) === null || _chessboardRef$curren === void 0 ? void 0 : _chessboardRef$curren.highlight(params);
  }, []);
  const findKing = (0, _react.useCallback)(type => {
    for (let x = 0; x < board.length; x++) {
      const row = board[x];

      for (let y = 0; y < row.length; y++) {
        const col = String.fromCharCode(97 + Math.round(x)); // eslint-disable-next-line no-shadow

        const row = `${8 - Math.round(y)}`;
        const square = `${col}${row}`;
        const piece = chess.get(square);
        if ((piece === null || piece === void 0 ? void 0 : piece.color) === type.charAt(0) && piece.type === type.charAt(1)) return square;
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
      move: params => {
        var _chessboardRef$curren2, _chessboardRef$curren3;

        return (_chessboardRef$curren2 = chessboardRef.current) === null || _chessboardRef$curren2 === void 0 ? void 0 : (_chessboardRef$curren3 = _chessboardRef$curren2.move) === null || _chessboardRef$curren3 === void 0 ? void 0 : _chessboardRef$curren3.call(_chessboardRef$curren2, params);
      },
      highlight,
      resetAllHighlightedSquares: () => {
        var _chessboardRef$curren4;

        return (_chessboardRef$curren4 = chessboardRef.current) === null || _chessboardRef$curren4 === void 0 ? void 0 : _chessboardRef$curren4.resetAllHighlightedSquares();
      },
      getState: () => {
        var _chessboardRef$curren5;

        return chessboardRef === null || chessboardRef === void 0 ? void 0 : (_chessboardRef$curren5 = chessboardRef.current) === null || _chessboardRef$curren5 === void 0 ? void 0 : _chessboardRef$curren5.getState();
      },
      resetBoard: params => {
        var _chessboardRef$curren6, _boardOperationsRef$c;

        (_chessboardRef$curren6 = chessboardRef.current) === null || _chessboardRef$curren6 === void 0 ? void 0 : _chessboardRef$curren6.resetBoard(params);
        (_boardOperationsRef$c = boardOperationsRef.current) === null || _boardOperationsRef$c === void 0 ? void 0 : _boardOperationsRef$c.reset();
      },
      undo: () => {
        var _chessboardRef$curren7, _boardOperationsRef$c2;

        (_chessboardRef$curren7 = chessboardRef.current) === null || _chessboardRef$curren7 === void 0 ? void 0 : _chessboardRef$curren7.undo();
        (_boardOperationsRef$c2 = boardOperationsRef.current) === null || _boardOperationsRef$c2 === void 0 ? void 0 : _boardOperationsRef$c2.reset();
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

const ChessboardContextProvider = /*#__PURE__*/_react.default.memo(ChessboardContextProviderComponent);

exports.ChessboardContextProvider = ChessboardContextProvider;
//# sourceMappingURL=board-context-provider.js.map