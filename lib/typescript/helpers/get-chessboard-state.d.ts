import type { ChessInstance } from 'chess.js';
type ChessboardStateFunctions = Pick<ChessInstance, 'in_check' | 'in_checkmate' | 'in_draw' | 'in_stalemate' | 'in_threefold_repetition' | 'insufficient_material' | 'game_over' | 'fen'>;
type RecordReturnTypes<T> = {
    readonly [P in keyof T]: T[P] extends () => any ? ReturnType<T[P]> : T[P];
};
export type ChessboardState = RecordReturnTypes<ChessboardStateFunctions>;
export declare const getChessboardState: (chess: ChessInstance) => ChessboardState;
export {};
//# sourceMappingURL=get-chessboard-state.d.ts.map