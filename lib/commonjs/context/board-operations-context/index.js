"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardOperationsContextProvider = exports.BoardOperationsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = require("react-native-reanimated");
var _getChessboardState = require("../../helpers/get-chessboard-state");
var _notation = require("../../notation");
var _hooks = require("../board-context/hooks");
var _hooks2 = require("../board-promotion-context/hooks");
var _hooks3 = require("../board-refs-context/hooks");
var _hooks4 = require("../chess-engine-context/hooks");
var _hooks5 = require("../props-context/hooks");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BoardOperationsContext = exports.BoardOperationsContext = /*#__PURE__*/(0, _react.createContext)({});
const BoardOperationsContextProviderComponent = /*#__PURE__*/_react.default.forwardRef(({
  children,
  controller,
  contextController
}, ref) => {
  const chess = (0, _hooks4.useChessEngine)();
  const setBoard = (0, _hooks.useSetBoard)();
  const {
    pieceSize,
    onMove: onChessboardMoveCallback,
    playersColor
  } = (0, _hooks5.useChessboardProps)();
  const {
    toTranslation,
    calculatePosition,
    isWhitePiecePosition
  } = (0, _notation.useReversePiecePosition)();
  const selectableSquares = (0, _reactNativeReanimated.useSharedValue)([]);
  const selectedSquare = (0, _reactNativeReanimated.useSharedValue)(null);
  const {
    showPromotionDialog
  } = (0, _hooks2.useBoardPromotion)();
  const pieceRefs = (0, _hooks3.usePieceRefs)();
  const [isPieceGestureInProgress, setIsPieceGestureInProgress] = (0, _react.useState)(false);
  const turn = (0, _reactNativeReanimated.useSharedValue)(chess.turn());
  (0, _react.useImperativeHandle)(ref, () => ({
    reset: () => {
      selectableSquares.value = [];
      controller?.resetAllHighlightedSquares();
      turn.value = chess.turn();
    }
  }), [chess, controller, selectableSquares, turn]);
  const isPromoting = (0, _react.useCallback)((from, to) => {
    if (!to.includes('8') && !to.includes('1')) return false;
    const val = toTranslation(from);
    const x = Math.floor(val.x / pieceSize);
    const y = Math.floor(val.y / pieceSize);
    const {
      x: calculatedX,
      y: calculatedY
    } = calculatePosition({
      x,
      y
    });
    const piece = chess.board()[calculatedY][calculatedX];
    return piece?.type === chess.PAWN && (to.includes('8') && piece.color === chess.WHITE || to.includes('1') && piece.color === chess.BLACK);
  }, [chess, pieceSize, toTranslation, calculatePosition]);
  const moveProgrammatically = (0, _react.useCallback)((from, to, promotionPiece) => {
    const move = chess.move({
      from,
      to,
      promotion: promotionPiece
    });
    turn.value = chess.turn();
    if (move == null) return;
    contextController?.checkIsCheckState();
    contextController?.checkIsCheckMateState();
    onChessboardMoveCallback?.({
      move,
      state: {
        ...(0, _getChessboardState.getChessboardState)(chess),
        in_promotion: promotionPiece != null
      }
    });
    setBoard(chess.board());
  }, [chess, contextController, onChessboardMoveCallback, setBoard, turn]);
  const onMove = (0, _react.useCallback)((from, to) => {
    selectableSquares.value = [];
    selectedSquare.value = null;
    const lastMove = {
      from,
      to
    };
    controller?.resetAllHighlightedSquares();
    controller?.highlight({
      square: lastMove.from
    });
    controller?.highlight({
      square: lastMove.to
    });
    const in_promotion = isPromoting(from, to);
    if (!in_promotion) {
      moveProgrammatically(from, to);
      return;
    }
    const chessTurn = chess.turn();
    if (chessTurn === playersColor) {
      pieceRefs?.current?.[to]?.current?.enable(false);
      showPromotionDialog({
        type: chessTurn,
        onSelect: piece => {
          moveProgrammatically(from, to, piece);
          pieceRefs?.current?.[to]?.current?.enable(true);
        }
      });
    }
  }, [chess, controller, isPromoting, moveProgrammatically, pieceRefs, selectableSquares, selectedSquare, showPromotionDialog, playersColor]);
  const onSelectPiece = (0, _react.useCallback)(square => {
    selectedSquare.value = square;
    const validSquares = chess.moves({
      square
    }) ?? [];

    // eslint-disable-next-line no-shadow
    selectableSquares.value = validSquares.map(square => {
      const splittedSquare = square.split('x');
      if (splittedSquare.length === 0) {
        return square;
      }
      const splittedSquareValue = splittedSquare[splittedSquare.length - 1];
      if (splittedSquareValue === 'O-O') {
        if (isWhitePiecePosition) {
          return 'Kg1';
        }
        return 'Kg8';
      }
      if (splittedSquareValue === 'O-O-O') {
        if (isWhitePiecePosition) {
          return 'Kc1';
        }
        return 'Kc8';
      }
      return splittedSquare[splittedSquare.length - 1];
    });
  }, [chess, selectableSquares, selectedSquare, isWhitePiecePosition]);
  const moveTo = (0, _react.useCallback)(to => {
    if (selectedSquare.value != null) {
      controller?.move({
        from: selectedSquare.value,
        to: to
      });
      return true;
    }
    return false;
  }, [controller, selectedSquare.value]);
  const value = (0, _react.useMemo)(() => {
    return {
      onMove,
      onSelectPiece,
      moveTo,
      selectableSquares,
      selectedSquare,
      isPromoting,
      turn,
      moveProgrammatically,
      isPieceGestureInProgress,
      setIsPieceGestureInProgress
    };
  }, [isPromoting, moveTo, onMove, onSelectPiece, selectableSquares, selectedSquare, turn, moveProgrammatically, isPieceGestureInProgress, setIsPieceGestureInProgress]);
  return /*#__PURE__*/_react.default.createElement(BoardOperationsContext.Provider, {
    value: value
  }, children);
});
const BoardOperationsContextProvider = exports.BoardOperationsContextProvider = /*#__PURE__*/_react.default.memo(BoardOperationsContextProviderComponent);
//# sourceMappingURL=index.js.map