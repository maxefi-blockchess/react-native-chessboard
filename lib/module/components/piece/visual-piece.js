function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Image } from 'react-native';
import { PIECES } from '../../constants';
import { useChessboardProps } from '../../context/props-context/hooks';
const ChessPiece = /*#__PURE__*/React.memo(({
  id,
  ...rest
}) => {
  const {
    pieceSize,
    renderPiece
  } = useChessboardProps();
  return renderPiece?.(id) ?? /*#__PURE__*/React.createElement(Image, _extends({
    style: [{
      width: pieceSize,
      height: pieceSize
    }, rest.style]
  }, rest, {
    source: PIECES[id]
  }));
});
export { ChessPiece };
//# sourceMappingURL=visual-piece.js.map