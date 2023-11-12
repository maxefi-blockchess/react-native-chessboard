import React, { PropsWithChildren } from 'react';
import type { ChessInstance, PieceType } from 'chess.js';
export type BoardPromotionContextType = {
    showPromotionDialog: (_: {
        type: PromotionDialogType;
        onSelect?: (_: PieceType) => void;
    }) => void;
    isPromoting: boolean;
};
declare const BoardPromotionContext: React.Context<BoardPromotionContextType>;
type PromotionDialogType = ReturnType<ChessInstance['turn']>;
export type BoardPromotionContextState = {
    isDialogActive: boolean;
    type?: PromotionDialogType;
    onSelect?: (_: PieceType) => void;
};
declare const BoardPromotionContextProvider: React.FC<PropsWithChildren>;
export { BoardPromotionContextProvider, BoardPromotionContext };
//# sourceMappingURL=index.d.ts.map