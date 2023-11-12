import React from 'react';
import { BoardContext, BoardSetterContext } from './board-context';
import { ChessboardRef } from './board-refs-context';
import { ChessEngineContext } from './chess-engine-context';
type BoardContextProviderProps = {
    fen?: string;
    children?: React.ReactNode;
};
declare const ChessboardContextProvider: React.MemoExoticComponent<React.ForwardRefExoticComponent<BoardContextProviderProps & React.RefAttributes<ChessboardRef>>>;
export { ChessboardContextProvider, ChessEngineContext, BoardContext, BoardSetterContext, };
//# sourceMappingURL=board-context-provider.d.ts.map