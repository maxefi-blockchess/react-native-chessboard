import React, { useImperativeHandle, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Background from './components/chessboard-background';
import { HighlightedSquares } from './components/highlighted-squares';
import { Pieces } from './components/pieces';
import { SuggestedDots } from './components/suggested-dots';
import { ChessboardContextProvider } from './context/board-context-provider';
import { ChessboardPropsContextProvider, DEFAULT_BOARD_SIZE } from './context/props-context';
import { useChessboardProps } from './context/props-context/hooks';
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1
  }
});
const Chessboard = /*#__PURE__*/React.memo(() => {
  const {
    boardSize
  } = useChessboardProps();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      width: boardSize
    }]
  }, /*#__PURE__*/React.createElement(Background, null), /*#__PURE__*/React.createElement(Pieces, null), /*#__PURE__*/React.createElement(HighlightedSquares, null), /*#__PURE__*/React.createElement(SuggestedDots, null));
});
const ChessboardContainerComponent = /*#__PURE__*/React.forwardRef((props, ref) => {
  const chessboardRef = useRef(null);
  useImperativeHandle(ref, () => ({
    move: params => chessboardRef.current?.move?.(params),
    highlight: params => chessboardRef.current?.highlight(params),
    resetAllHighlightedSquares: () => chessboardRef.current?.resetAllHighlightedSquares(),
    getState: () => chessboardRef?.current?.getState(),
    resetBoard: params => chessboardRef.current?.resetBoard(params),
    undo: () => chessboardRef.current?.undo()
  }), []);
  return /*#__PURE__*/React.createElement(GestureHandlerRootView, null, /*#__PURE__*/React.createElement(ChessboardPropsContextProvider, props, /*#__PURE__*/React.createElement(ChessboardContextProvider, {
    ref: chessboardRef,
    fen: props.fen
  }, /*#__PURE__*/React.createElement(Chessboard, null))));
});
const ChessboardContainer = /*#__PURE__*/React.memo(ChessboardContainerComponent);
export { DEFAULT_BOARD_SIZE };
export default ChessboardContainer;
//# sourceMappingURL=index.js.map