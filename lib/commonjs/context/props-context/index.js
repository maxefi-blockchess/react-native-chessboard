"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_BOARD_SIZE = exports.ChessboardPropsContextProvider = exports.ChessboardPropsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  width: SCREEN_WIDTH
} = _reactNative.Dimensions.get('window');
const DEFAULT_BOARD_SIZE = exports.DEFAULT_BOARD_SIZE = Math.floor(SCREEN_WIDTH / 8) * 8;
const defaultChessboardProps = {
  gestureEnabled: true,
  colors: {
    black: 'rgb(39, 40, 40)',
    white: 'rgb(81, 81, 81)',
    lastMoveHighlight: 'rgba(44, 141, 255, 0.1)',
    checkmateHighlight: '#EE3232',
    promotionPieceButton: 'transparent',
    suggested: 'transparent',
    text: '#C1C4C7'
  },
  durations: {
    move: 150
  },
  withLetters: true,
  withNumbers: true,
  boardSize: DEFAULT_BOARD_SIZE,
  pieceSize: DEFAULT_BOARD_SIZE / 8,
  playersColor: 'w'
};
const ChessboardPropsContext = exports.ChessboardPropsContext = /*#__PURE__*/_react.default.createContext(defaultChessboardProps);
const ChessboardPropsContextProvider = exports.ChessboardPropsContextProvider = /*#__PURE__*/_react.default.memo(({
  children,
  ...rest
}) => {
  const value = (0, _react.useMemo)(() => {
    const data = {
      ...defaultChessboardProps,
      ...rest,
      colors: {
        ...defaultChessboardProps.colors,
        ...rest.colors
      },
      durations: {
        ...defaultChessboardProps.durations,
        ...rest.durations
      }
    };
    return {
      ...data,
      pieceSize: data.boardSize / 8
    };
  }, [rest]);
  return /*#__PURE__*/_react.default.createElement(ChessboardPropsContext.Provider, {
    value: value
  }, children);
});

// eslint-disable-next-line no-undef
//# sourceMappingURL=index.js.map