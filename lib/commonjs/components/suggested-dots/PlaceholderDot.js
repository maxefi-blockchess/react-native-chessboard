"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaceholderDot = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _hooks = require("../../context/props-context/hooks");
var _notation = require("../../notation");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PlaceholderDot = exports.PlaceholderDot = /*#__PURE__*/_react.default.memo(({
  x,
  y,
  selectableSquares,
  moveTo
}) => {
  const {
    pieceSize,
    colors
  } = (0, _hooks.useChessboardProps)();
  const {
    toPosition,
    toTranslation
  } = (0, _notation.useReversePiecePosition)();
  const currentSquare = toPosition({
    x: x * pieceSize,
    y: y * pieceSize
  });
  const {
    suggested
  } = colors;
  const translation = (0, _react.useMemo)(() => toTranslation(currentSquare), [currentSquare, toTranslation]);
  const isSelectable = (0, _reactNativeReanimated.useDerivedValue)(() => {
    'worklet';

    return selectableSquares.value.map(square => square.includes(currentSquare)).filter(v => v).length > 0;
  }, [currentSquare, selectableSquares.value]);
  const rPlaceholderStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const canBeSelected = isSelectable.value;
    return {
      opacity: (0, _reactNativeReanimated.withTiming)(canBeSelected ? 1 : 0)
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onTouchEnd: () => {
      if (isSelectable.value && moveTo) {
        (0, _reactNativeReanimated.runOnJS)(moveTo)(currentSquare);
      }
    },
    style: [styles.placeholderContainer, {
      width: pieceSize,
      transform: [{
        translateX: translation.x
      }, {
        translateY: translation.y
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.placeholder, {
      borderColor: suggested
    }, rPlaceholderStyle]
  }));
});
const styles = _reactNative.StyleSheet.create({
  placeholderContainer: {
    position: 'absolute',
    aspectRatio: 1,
    backgroundColor: 'transparent'
  },
  placeholder: {
    flex: 1,
    borderWidth: 0.5,
    opacity: 1
  }
});
//# sourceMappingURL=PlaceholderDot.js.map