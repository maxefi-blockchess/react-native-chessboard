"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DEFAULT_BOARD_SIZE", {
  enumerable: true,
  get: function () {
    return _propsContext.DEFAULT_BOARD_SIZE;
  }
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _chessboardBackground = _interopRequireDefault(require("./components/chessboard-background"));
var _highlightedSquares = require("./components/highlighted-squares");
var _pieces = require("./components/pieces");
var _suggestedDots = require("./components/suggested-dots");
var _boardContextProvider = require("./context/board-context-provider");
var _propsContext = require("./context/props-context");
var _hooks = require("./context/props-context/hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const styles = _reactNative.StyleSheet.create({
  container: {
    aspectRatio: 1
  }
});
const Chessboard = /*#__PURE__*/_react.default.memo(() => {
  const {
    boardSize
  } = (0, _hooks.useChessboardProps)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width: boardSize
    }]
  }, /*#__PURE__*/_react.default.createElement(_chessboardBackground.default, null), /*#__PURE__*/_react.default.createElement(_pieces.Pieces, null), /*#__PURE__*/_react.default.createElement(_highlightedSquares.HighlightedSquares, null), /*#__PURE__*/_react.default.createElement(_suggestedDots.SuggestedDots, null));
});
const ChessboardContainerComponent = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const chessboardRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
    move: params => chessboardRef.current?.move?.(params),
    highlight: params => chessboardRef.current?.highlight(params),
    resetAllHighlightedSquares: () => chessboardRef.current?.resetAllHighlightedSquares(),
    getState: () => chessboardRef?.current?.getState(),
    resetBoard: params => chessboardRef.current?.resetBoard(params),
    undo: () => chessboardRef.current?.undo()
  }), []);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(_propsContext.ChessboardPropsContextProvider, props, /*#__PURE__*/_react.default.createElement(_boardContextProvider.ChessboardContextProvider, {
    ref: chessboardRef,
    fen: props.fen
  }, /*#__PURE__*/_react.default.createElement(Chessboard, null))));
});
const ChessboardContainer = /*#__PURE__*/_react.default.memo(ChessboardContainerComponent);
var _default = exports.default = ChessboardContainer;
//# sourceMappingURL=index.js.map