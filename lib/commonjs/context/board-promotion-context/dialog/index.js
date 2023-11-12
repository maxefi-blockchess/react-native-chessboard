"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromotionDialog = void 0;
var _hooks = require("../../../context/props-context/hooks");
var _react = _interopRequireDefault(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNative = require("react-native");
var _dialogPiece = require("./dialog-piece");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PROMOTION_PIECES = ['q', 'r', 'n', 'b'];
const PromotionDialog = exports.PromotionDialog = /*#__PURE__*/_react.default.memo(({
  type,
  onSelect
}) => {
  const {
    boardSize
  } = (0, _hooks.useChessboardProps)();
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    entering: _reactNativeReanimated.FadeIn,
    exiting: _reactNativeReanimated.FadeOut,
    style: [{
      width: boardSize / 3
    }, styles.container]
  }, PROMOTION_PIECES.map((piece, i) => {
    return /*#__PURE__*/_react.default.createElement(_dialogPiece.DialogPiece, {
      key: i,
      width: boardSize / 6,
      index: i,
      piece: piece,
      type: type,
      onSelectPiece: onSelect
    });
  }));
});
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    aspectRatio: 1,
    backgroundColor: 'rgb(40,40,40)',
    borderRadius: 5,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 5,
      width: 0
    },
    flexWrap: 'wrap'
  }
});
//# sourceMappingURL=index.js.map