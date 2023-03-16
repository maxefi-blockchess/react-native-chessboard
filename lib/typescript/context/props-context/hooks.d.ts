export declare const useChessboardProps: () => import("./index").ChessboardProps & Required<Pick<import("./index").ChessboardProps, "gestureEnabled" | "withLetters" | "withNumbers" | "boardSize">> & {
    pieceSize: number;
} & {
    colors: Required<{
        white?: string | undefined;
        black?: string | undefined;
        lastMoveHighlight?: string | undefined;
        checkmateHighlight?: string | undefined;
        promotionPieceButton?: string | undefined;
        suggested?: string | undefined;
        text?: string | undefined;
    }>;
    durations: Required<{
        move?: number | undefined;
    }>;
};
