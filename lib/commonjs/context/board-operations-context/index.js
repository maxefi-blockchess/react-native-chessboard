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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BoardOperationsContext = /*#__PURE__*/(0, _react.createContext)({});
exports.BoardOperationsContext = BoardOperationsContext;

const BoardOperationsContextProviderComponent = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    controller,
    contextController
  } = _ref;
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
      controller === null || controller === void 0 ? void 0 : controller.resetAllHighlightedSquares();
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
    return (piece === null || piece === void 0 ? void 0 : piece.type) === chess.PAWN && (to.includes('8') && piece.color === chess.WHITE || to.includes('1') && piece.color === chess.BLACK);
  }, [chess, pieceSize, toTranslation, calculatePosition]);
  const moveProgrammatically = (0, _react.useCallback)((from, to, promotionPiece) => {
    const move = chess.move({
      from,
      to,
      promotion: promotionPiece
    });
    turn.value = chess.turn();
    if (move == null) return;
    contextController === null || contextController === void 0 ? void 0 : contextController.checkIsCheckState();
    contextController === null || contextController === void 0 ? void 0 : contextController.checkIsCheckMateState();
    onChessboardMoveCallback === null || onChessboardMoveCallback === void 0 ? void 0 : onChessboardMoveCallback({
      move,
      state: { ...(0, _getChessboardState.getChessboardState)(chess),
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
    controller === null || controller === void 0 ? void 0 : controller.resetAllHighlightedSquares();
    controller === null || controller === void 0 ? void 0 : controller.highlight({
      square: lastMove.from
    });
    controller === null || controller === void 0 ? void 0 : controller.highlight({
      square: lastMove.to
    });
    const in_promotion = isPromoting(from, to);

    if (!in_promotion) {
      moveProgrammatically(from, to);
      return;
    }

    const chessTurn = chess.turn();

    if (chessTurn === playersColor) {
      var _pieceRefs$current, _pieceRefs$current$to, _pieceRefs$current$to2;

      pieceRefs === null || pieceRefs === void 0 ? void 0 : (_pieceRefs$current = pieceRefs.current) === null || _pieceRefs$current === void 0 ? void 0 : (_pieceRefs$current$to = _pieceRefs$current[to]) === null || _pieceRefs$current$to === void 0 ? void 0 : (_pieceRefs$current$to2 = _pieceRefs$current$to.current) === null || _pieceRefs$current$to2 === void 0 ? void 0 : _pieceRefs$current$to2.enable(false);
      showPromotionDialog({
        type: chessTurn,
        onSelect: piece => {
          var _pieceRefs$current2, _pieceRefs$current2$t, _pieceRefs$current2$t2;

          moveProgrammatically(from, to, piece);
          pieceRefs === null || pieceRefs === void 0 ? void 0 : (_pieceRefs$current2 = pieceRefs.current) === null || _pieceRefs$current2 === void 0 ? void 0 : (_pieceRefs$current2$t = _pieceRefs$current2[to]) === null || _pieceRefs$current2$t === void 0 ? void 0 : (_pieceRefs$current2$t2 = _pieceRefs$current2$t.current) === null || _pieceRefs$current2$t2 === void 0 ? void 0 : _pieceRefs$current2$t2.enable(true);
        }
      });
    }
  }, [chess, controller, isPromoting, moveProgrammatically, pieceRefs, selectableSquares, selectedSquare, showPromotionDialog, playersColor]);
  const onSelectPiece = (0, _react.useCallback)(square => {
    var _chess$moves;

    selectedSquare.value = square;
    const validSquares = (_chess$moves = chess.moves({
      square
    })) !== null && _chess$moves !== void 0 ? _chess$moves : []; // eslint-disable-next-line no-shadow

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
      controller === null || controller === void 0 ? void 0 : controller.move({
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

const BoardOperationsContextProvider = /*#__PURE__*/_react.default.memo(BoardOperationsContextProviderComponent);

exports.BoardOperationsContextProvider = BoardOperationsContextProvider;
//# sourceMappingURL=index.js.map