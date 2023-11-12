"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightedSquares = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hooks = require("../../context/props-context/hooks");
var _hooks2 = require("../../context/chess-engine-context/hooks");
var _notation = require("../../notation");
var _highlightedSquare = require("./highlighted-square");
var _hooks3 = require("../../context/board-refs-context/hooks");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const HighlightedSquares = exports.HighlightedSquares = /*#__PURE__*/_react.default.memo(() => {
  const chess = (0, _hooks2.useChessEngine)();
  const board = (0, _react.useMemo)(() => chess.board(), [chess]);
  const {
    pieceSize
  } = (0, _hooks.useChessboardProps)();
  const {
    toPosition,
    toTranslation,
    calculatePosition
  } = (0, _notation.useReversePiecePosition)();
  const refs = (0, _hooks3.useSquareRefs)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      ..._reactNative.StyleSheet.absoluteFillObject
    }
  }, board.map((row, y) => row.map((_, x) => {
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
    const translation = toTranslation(square);
    return /*#__PURE__*/_react.default.createElement(_highlightedSquare.HighlightedSquare, {
      key: `${calculatedX}-${calculatedY}`,
      ref: refs?.current?.[square],
      style: [styles.highlightedSquare, {
        width: pieceSize,
        transform: [{
          translateX: translation.x
        }, {
          translateY: translation.y
        }]
      }]
    });
  })));
});
const styles = _reactNative.StyleSheet.create({
  highlightedSquare: {
    position: 'absolute',
    aspectRatio: 1
  }
});
//# sourceMappingURL=index.js.map