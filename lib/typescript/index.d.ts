import React from 'react';
import type { ChessboardRef } from './context/board-refs-context';
import { ChessboardProps, ChessMoveInfo, DEFAULT_BOARD_SIZE } from './context/props-context';
import type { ChessboardState } from './helpers/get-chessboard-state';
declare const ChessboardContainer: React.MemoExoticComponent<React.ForwardRefExoticComponent<ChessboardProps & React.RefAttributes<ChessboardRef>>>;
export { DEFAULT_BOARD_SIZE };
export type { ChessboardRef, ChessboardProps, ChessMoveInfo, ChessboardState };
export default ChessboardContainer;
