"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_BOARD_SIZE = exports.ChessboardPropsContextProvider = exports.ChessboardPropsContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  width: SCREEN_WIDTH
} = _reactNative.Dimensions.get('window');

const DEFAULT_BOARD_SIZE = Math.floor(SCREEN_WIDTH / 8) * 8;
exports.DEFAULT_BOARD_SIZE = DEFAULT_BOARD_SIZE;
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

const ChessboardPropsContext = /*#__PURE__*/_react.default.createContext(defaultChessboardProps);

exports.ChessboardPropsContext = ChessboardPropsContext;

const ChessboardPropsContextProvider = /*#__PURE__*/_react.default.memo(_ref => {
  let {
    children,
    ...rest
  } = _ref;
  const value = (0, _react.useMemo)(() => {
    const data = { ...defaultChessboardProps,
      ...rest,
      colors: { ...defaultChessboardProps.colors,
        ...rest.colors
      },
      durations: { ...defaultChessboardProps.durations,
        ...rest.durations
      }
    };
    return { ...data,
      pieceSize: data.boardSize / 8
    };
  }, [rest]);
  return /*#__PURE__*/_react.default.createElement(ChessboardPropsContext.Provider, {
    value: value
  }, children);
}); // eslint-disable-next-line no-undef


exports.ChessboardPropsContextProvider = ChessboardPropsContextProvider;
//# sourceMappingURL=index.js.map