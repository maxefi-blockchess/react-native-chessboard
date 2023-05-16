import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useBoardOperations } from '../../context/board-operations-context/hooks';
import { useChessEngine } from '../../context/chess-engine-context/hooks';
import { useReversePiecePosition } from '../../notation';

import { PlaceholderDot } from './PlaceholderDot';

const SuggestedDots: React.FC = React.memo(() => {
  const chess = useChessEngine();
  const { moveTo, selectableSquares } = useBoardOperations();
  const board = useMemo(() => chess.board(), [chess]);
  const { calculatePosition } = useReversePiecePosition();

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {board.map((row, y) =>
        row.map((_, x) => {
          const { x: calculatedX, y: calculatedY } = calculatePosition({
            x,
            y,
          });

          return (
            <PlaceholderDot
              key={`${calculatedX}-${calculatedY}`}
              x={calculatedX}
              y={calculatedY}
              selectableSquares={selectableSquares}
              moveTo={moveTo}
            />
          );
        })
      )}
    </View>
  );
});

export { SuggestedDots };
