import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type HighlightedSquareProps = {
    style?: StyleProp<ViewStyle>;
};
export type HighlightedSquareRefType = {
    isHighlighted: () => boolean;
    reset: () => void;
    highlight: (_?: {
        backgroundColor?: string;
        borderColor?: string;
    }) => void;
};
declare const HighlightedSquare: React.MemoExoticComponent<React.ForwardRefExoticComponent<HighlightedSquareProps & React.RefAttributes<HighlightedSquareRefType>>>;
export { HighlightedSquare };
//# sourceMappingURL=highlighted-square.d.ts.map