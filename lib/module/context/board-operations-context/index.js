import React, { createContext, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { getChessboardState } from '../../helpers/get-chessboard-state';
import { useReversePiecePosition } from '../../notation';
import { useSetBoard } from '../board-context/hooks';
import { useBoardPromotion } from '../board-promotion-context/hooks';
import { usePieceRefs } from '../board-refs-context/hooks';
import { useChessEngine } from '../chess-engine-context/hooks';
import { useChessboardProps } from '../props-context/hooks';
const BoardOperationsContext = /*#__PURE__*/createContext({});
const BoardOperationsContextProviderComponent = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    controller,
    contextController
  } = _ref;
  const chess = useChessEngine();
  const setBoard = useSetBoard();
  const {
    pieceSize,
    onMove: onChessboardMoveCallback,
    playersColor
  } = useChessboardProps();
  const {
    toTranslation,
    calculatePosition,
    isWhitePiecePosition
  } = useReversePiecePosition();
  const selectableSquares = useSharedValue([]);
  const selectedSquare = useSharedValue(null);
  const {
    showPromotionDialog
  } = useBoardPromotion();
  const pieceRefs = usePieceRefs();
  const [isPieceGestureInProgress, setIsPieceGestureInProgress] = useState(false);
  const turn = useSharedValue(chess.turn());
  useImperativeHandle(ref, () => ({
    reset: () => {
      selectableSquares.value = [];
      controller === null || controller === void 0 ? void 0 : controller.resetAllHighlightedSquares();
      turn.value = chess.turn();
    }
  }), [chess, controller, selectableSquares, turn]);
  const isPromoting = useCallback((from, to) => {
    if (!to.includes('8') && !to.includes('1')) return false;
    const val = toTranslation(from);
    const x = Math.floor(val.x / pieceSize);
    const y = Math.floor(val.y / pieceSize);
    const {
      x: calculatedX,
      y: calculatedY
    } = calculatePosition({
      x,
      y
    });
    const piece = chess.board()[calculatedY][calculatedX];
    return (piece === null || piece === void 0 ? void 0 : piece.type) === chess.PAWN && (to.includes('8') && piece.color === chess.WHITE || to.includes('1') && piece.color === chess.BLACK);
  }, [chess, pieceSize, toTranslation, calculatePosition]);
  const moveProgrammatically = useCallback((from, to, promotionPiece) => {
    const move = chess.move({
      from,
      to,
      promotion: promotionPiece
    });
    turn.value = chess.turn();
    if (move == null) return;
    contextController === null || contextController === void 0 ? void 0 : contextController.checkIsCheckState();
    contextController === null || contextController === void 0 ? void 0 : contextController.checkIsCheckMateState();
    onChessboardMoveCallback === null || onChessboardMoveCallback === void 0 ? void 0 : onChessboardMoveCallback({
      move,
      state: { ...getChessboardState(chess),
        in_promotion: promotionPiece != null
      }
    });
    setBoard(chess.board());
  }, [chess, contextController, onChessboardMoveCallback, setBoard, turn]);
  const onMove = useCallback((from, to) => {
    selectableSquares.value = [];
    selectedSquare.value = null;
    const lastMove = {
      from,
      to
    };
    controller === null || controller === void 0 ? void 0 : controller.resetAllHighlightedSquares();
    controller === null || controller === void 0 ? void 0 : controller.highlight({
      square: lastMove.from
    });
    controller === null || controller === void 0 ? void 0 : controller.highlight({
      square: lastMove.to
    });
    const in_promotion = isPromoting(from, to);

    if (!in_promotion) {
      moveProgrammatically(from, to);
      return;
    }

    const chessTurn = chess.turn();

    if (chessTurn === playersColor) {
      var _pieceRefs$current, _pieceRefs$current$to, _pieceRefs$current$to2;

      pieceRefs === null || pieceRefs === void 0 ? void 0 : (_pieceRefs$current = pieceRefs.current) === null || _pieceRefs$current === void 0 ? void 0 : (_pieceRefs$current$to = _pieceRefs$current[to]) === null || _pieceRefs$current$to === void 0 ? void 0 : (_pieceRefs$current$to2 = _pieceRefs$current$to.current) === null || _pieceRefs$current$to2 === void 0 ? void 0 : _pieceRefs$current$to2.enable(false);
      showPromotionDialog({
        type: chessTurn,
        onSelect: piece => {
          var _pieceRefs$current2, _pieceRefs$current2$t, _pieceRefs$current2$t2;

          moveProgrammatically(from, to, piece);
          pieceRefs === null || pieceRefs === void 0 ? void 0 : (_pieceRefs$current2 = pieceRefs.current) === null || _pieceRefs$current2 === void 0 ? void 0 : (_pieceRefs$current2$t = _pieceRefs$current2[to]) === null || _pieceRefs$current2$t === void 0 ? void 0 : (_pieceRefs$current2$t2 = _pieceRefs$current2$t.current) === null || _pieceRefs$current2$t2 === void 0 ? void 0 : _pieceRefs$current2$t2.enable(true);
        }
      });
    }
  }, [chess, controller, isPromoting, moveProgrammatically, pieceRefs, selectableSquares, selectedSquare, showPromotionDialog, playersColor]);
  const onSelectPiece = useCallback(square => {
    var _chess$moves;

    selectedSquare.value = square;
    const validSquares = (_chess$moves = chess.moves({
      square
    })) !== null && _chess$moves !== void 0 ? _chess$moves : []; // eslint-disable-next-line no-shadow

    selectableSquares.value = validSquares.map(square => {
      const splittedSquare = square.split('x');

      if (splittedSquare.length === 0) {
        return square;
      }

      const splittedSquareValue = splittedSquare[splittedSquare.length - 1];

      if (splittedSquareValue === 'O-O') {
        if (isWhitePiecePosition) {
          return 'Kg1';
        }

        return 'Kg8';
      }

      if (splittedSquareValue === 'O-O-O') {
        if (isWhitePiecePosition) {
          return 'Kc1';
        }

        return 'Kc8';
      }

      return splittedSquare[splittedSquare.length - 1];
    });
  }, [chess, selectableSquares, selectedSquare, isWhitePiecePosition]);
  const moveTo = useCallback(to => {
    if (selectedSquare.value != null) {
      controller === null || controller === void 0 ? void 0 : controller.move({
        from: selectedSquare.value,
        to: to
      });
      return true;
    }

    return false;
  }, [controller, selectedSquare.value]);
  const value = useMemo(() => {
    return {
      onMove,
      onSelectPiece,
      moveTo,
      selectableSquares,
      selectedSquare,
      isPromoting,
      turn,
      moveProgrammatically,
      isPieceGestureInProgress,
      setIsPieceGestureInProgress
    };
  }, [isPromoting, moveTo, onMove, onSelectPiece, selectableSquares, selectedSquare, turn, moveProgrammatically, isPieceGestureInProgress, setIsPieceGestureInProgress]);
  return /*#__PURE__*/React.createElement(BoardOperationsContext.Provider, {
    value: value
  }, children);
});
const BoardOperationsContextProvider = /*#__PURE__*/React.memo(BoardOperationsContextProviderComponent);
export { BoardOperationsContextProvider, BoardOperationsContext };
//# sourceMappingURL=index.js.map