"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightedSquare = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _hooks = require("../../context/props-context/hooks");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const HighlightedSquareComponent = /*#__PURE__*/_react.default.forwardRef(({
  style
}, ref) => {
  const {
    colors: {
      lastMoveHighlight
    }
  } = (0, _hooks.useChessboardProps)();
  const backgroundColor = (0, _reactNativeReanimated.useSharedValue)(lastMoveHighlight);
  const isHighlighted = (0, _reactNativeReanimated.useSharedValue)(false);
  const borderColor = (0, _reactNativeReanimated.useSharedValue)(lastMoveHighlight);
  (0, _react.useImperativeHandle)(ref, () => ({
    reset: () => {
      isHighlighted.value = false;
    },
    highlight: ({
      backgroundColor: bg,
      borderColor: border
    } = {}) => {
      backgroundColor.value = bg ?? lastMoveHighlight;
      isHighlighted.value = true;
      borderColor.value = border ?? lastMoveHighlight;
    },
    isHighlighted: () => isHighlighted.value
  }), [backgroundColor, isHighlighted, lastMoveHighlight, borderColor]);
  const rHighlightedSquareStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.withTiming)(isHighlighted.value ? 1 : 0),
      backgroundColor: backgroundColor.value,
      borderWidth: 0.5,
      borderColor: borderColor.value
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.highlightedSquare, style, rHighlightedSquareStyle]
  });
});
const styles = _reactNative.StyleSheet.create({
  highlightedSquare: {
    position: 'absolute',
    aspectRatio: 1
  }
});
const HighlightedSquare = exports.HighlightedSquare = /*#__PURE__*/_react.default.memo(HighlightedSquareComponent);
//# sourceMappingURL=highlighted-square.js.map