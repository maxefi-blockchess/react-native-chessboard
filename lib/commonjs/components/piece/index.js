"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _hooks = require("../../context/props-context/hooks");
var _hooks2 = require("../../context/board-operations-context/hooks");
var _hooks3 = require("../../context/board-promotion-context/hooks");
var _hooks4 = require("../../context/board-refs-context/hooks");
var _hooks5 = require("../../context/chess-engine-context/hooks");
var _notation = require("../../notation");
var _visualPiece = require("./visual-piece");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Piece = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(({
  id,
  startPosition,
  square,
  size
}, ref) => {
  const chess = (0, _hooks5.useChessEngine)();
  const refs = (0, _hooks4.usePieceRefs)();
  const pieceEnabled = (0, _reactNativeReanimated.useSharedValue)(true);
  const {
    isPromoting
  } = (0, _hooks3.useBoardPromotion)();
  const {
    onSelectPiece,
    onMove,
    selectedSquare,
    turn,
    isPieceGestureInProgress,
    setIsPieceGestureInProgress
  } = (0, _hooks2.useBoardOperations)();
  const [isPieceActive, setIsPieceActive] = (0, _react.useState)(false);
  const {
    pieceSize,
    durations: {
      move: moveDuration
    },
    gestureEnabled: gestureEnabledFromChessboardProps,
    playersColor
  } = (0, _hooks.useChessboardProps)();
  const gestureEnabled = (0, _reactNativeReanimated.useDerivedValue)(() => turn.value === id.charAt(0) && turn.value === playersColor && gestureEnabledFromChessboardProps, [id, gestureEnabledFromChessboardProps]);
  const {
    toPosition,
    toTranslation
  } = (0, _notation.useReversePiecePosition)();
  const isGestureActive = (0, _reactNativeReanimated.useSharedValue)(false);
  const offsetX = (0, _reactNativeReanimated.useSharedValue)(0);
  const offsetY = (0, _reactNativeReanimated.useSharedValue)(0);
  const borderColor = (0, _reactNativeReanimated.useSharedValue)(1);
  const translateX = (0, _reactNativeReanimated.useSharedValue)(startPosition.x * size);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(startPosition.y * size);
  const validateMove = (0, _react.useCallback)((from, to) => {
    return chess.moves({
      verbose: true
    }).find(m => m.from === from && m.to === to);
  }, [chess]);
  const wrappedOnMoveForJSThread = (0, _react.useCallback)(({
    move
  }) => {
    onMove(move.from, move.to);
  }, [onMove]);
  const moveTo = (0, _react.useCallback)((from, to) => {
    return new Promise(resolve => {
      const move = validateMove(from, to);
      const {
        x,
        y
      } = toTranslation(move ? move.to : from);
      translateX.value = (0, _reactNativeReanimated.withTiming)(x, {
        duration: moveDuration
      }, () => {
        offsetX.value = translateX.value;
      });
      translateY.value = (0, _reactNativeReanimated.withTiming)(y, {
        duration: moveDuration
      }, isFinished => {
        if (!isFinished) return;
        offsetY.value = translateY.value;
        isGestureActive.value = false;
        if (move) {
          (0, _reactNativeReanimated.runOnJS)(wrappedOnMoveForJSThread)({
            move
          });
          // Ideally I must call the resolve method
          // inside the "wrappedOnMoveForJSThread" after
          // the "onMove" function.
          // Unfortunately I'm not able to pass a
          // function in the RunOnJS params
          (0, _reactNativeReanimated.runOnJS)(resolve)(move);
        } else {
          (0, _reactNativeReanimated.runOnJS)(resolve)(undefined);
        }
      });
    });
  }, [isGestureActive, moveDuration, offsetX, offsetY, toTranslation, translateX, translateY, validateMove, wrappedOnMoveForJSThread]);
  const movePiece = (0, _react.useCallback)(to => {
    const from = toPosition({
      x: offsetX.value,
      y: offsetY.value
    });
    moveTo(from, to);
  }, [moveTo, offsetX.value, offsetY.value, toPosition]);
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      moveTo: to => {
        return moveTo(square, to);
      },
      enable: active => {
        pieceEnabled.value = active;
      }
    };
  }, [moveTo, pieceEnabled, square]);
  const onStartTap = (0, _react.useCallback)(
  // eslint-disable-next-line no-shadow
  square => {
    'worklet';

    if (!onSelectPiece) {
      return;
    }
    (0, _reactNativeReanimated.runOnJS)(onSelectPiece)(square);
  }, [onSelectPiece]);
  const globalMoveTo = (0, _react.useCallback)(move => {
    refs?.current?.[move.from].current?.moveTo?.(move.to);
  }, [refs]);
  const handleOnBegin = (0, _react.useCallback)(() => {
    const currentSquare = toPosition({
      x: translateX.value,
      y: translateY.value
    });
    const previousTappedSquare = selectedSquare.value;
    const move = previousTappedSquare && validateMove(previousTappedSquare, currentSquare);
    if (move) {
      (0, _reactNativeReanimated.runOnJS)(globalMoveTo)(move);
      return;
    }
    if (!gestureEnabled.value) return;
    borderColor.value = (0, _reactNativeReanimated.withTiming)(0);
    onStartTap(square);
  }, [borderColor, gestureEnabled.value, globalMoveTo, onStartTap, selectedSquare.value, square, toPosition, translateX.value, translateY.value, validateMove]);
  const gestureProgress = _reactNativeGestureHandler.Gesture.Pan().enabled(!isPromoting && pieceEnabled.value).onBegin(() => {
    (0, _reactNativeReanimated.runOnJS)(setIsPieceActive)(true);
    (0, _reactNativeReanimated.runOnJS)(setIsPieceGestureInProgress)(true);
    offsetX.value = translateX.value;
    offsetY.value = translateY.value;
    (0, _reactNativeReanimated.runOnJS)(handleOnBegin)();
  }).onStart(() => {
    if (!gestureEnabled.value) return;
    isGestureActive.value = true;
  }).onUpdate(({
    translationX,
    translationY
  }) => {
    if (!gestureEnabled.value) return;
    translateX.value = offsetX.value + translationX;
    translateY.value = offsetY.value + translationY;
  }).onEnd(() => {
    if (!gestureEnabled.value) return;
    (0, _reactNativeReanimated.runOnJS)(movePiece)(toPosition({
      x: translateX.value,
      y: translateY.value
    }));
  }).onFinalize(() => {
    (0, _reactNativeReanimated.runOnJS)(setIsPieceActive)(false);
    (0, _reactNativeReanimated.runOnJS)(setIsPieceGestureInProgress)(false);
    borderColor.value = (0, _reactNativeReanimated.withTiming)(1);
  });
  const gestureDisabled = _reactNativeGestureHandler.Gesture.Pan().enabled(false);
  const gesture = (0, _react.useMemo)(() => {
    if (isPieceGestureInProgress && !isPieceActive) {
      return gestureDisabled;
    }
    return gestureProgress;
  }, [isPieceGestureInProgress, isPieceActive, gestureProgress, gestureDisabled]);
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      zIndex: selectedSquare.value ? 100 : 10,
      borderColor: selectedSquare.value === square ? `rgba(44, 141, 255,${borderColor.value.toFixed(2)})` : 'transparent',
      borderWidth: 1,
      backgroundColor: selectedSquare.value === square && !isGestureActive.value ? `rgba(44, 141, 255, ${(borderColor.value / 5).toFixed(2)})` : 'transparent',
      boxSize: 'border-box',
      width: pieceSize,
      height: pieceSize,
      transform: [{
        translateX: translateX.value
      }, {
        translateY: translateY.value
      }]
    };
  }, [selectedSquare.value]);
  const underlay = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const position = toPosition({
      x: translateX.value,
      y: translateY.value
    });
    const translation = toTranslation(position);
    return {
      position: 'absolute',
      width: size * 2,
      height: size * 2,
      borderRadius: size,
      zIndex: 0,
      backgroundColor: 'transparent',
      transform: [{
        translateX: translation.x - size / 2
      }, {
        translateY: translation.y - size / 2
      }]
    };
  }, [size]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: underlay
  }), /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gesture
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: style
  }, /*#__PURE__*/_react.default.createElement(_visualPiece.ChessPiece, {
    id: id
  }))));
}), (prev, next) => prev.id === next.id && prev.size === next.size && prev.square === next.square);
var _default = exports.default = Piece;
//# sourceMappingURL=index.js.map