import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
const {
  width: SCREEN_WIDTH
} = Dimensions.get('window');
const DEFAULT_BOARD_SIZE = Math.floor(SCREEN_WIDTH / 8) * 8;
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
const ChessboardPropsContext = /*#__PURE__*/React.createContext(defaultChessboardProps);
const ChessboardPropsContextProvider = /*#__PURE__*/React.memo(_ref => {
  let {
    children,
    ...rest
  } = _ref;
  const value = useMemo(() => {
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
  return /*#__PURE__*/React.createElement(ChessboardPropsContext.Provider, {
    value: value
  }, children);
});
export { ChessboardPropsContextProvider, ChessboardPropsContext, DEFAULT_BOARD_SIZE }; // eslint-disable-next-line no-undef
//# sourceMappingURL=index.js.map