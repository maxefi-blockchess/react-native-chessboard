"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardPromotionContextProvider = exports.BoardPromotionContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _dialog = require("./dialog");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const BoardPromotionContext = exports.BoardPromotionContext = /*#__PURE__*/_react.default.createContext({
  showPromotionDialog: () => {},
  isPromoting: false
});
const BoardPromotionContextProvider = exports.BoardPromotionContextProvider = /*#__PURE__*/_react.default.memo(({
  children
}) => {
  const [dialog, setDialog] = (0, _react.useState)({
    isDialogActive: false
  });
  const showPromotionDialog = (0, _react.useCallback)(({
    type,
    onSelect
  }) => {
    setDialog({
      isDialogActive: true,
      type,
      onSelect
    });
  }, []);
  const onSelect = (0, _react.useCallback)(piece => {
    dialog.onSelect?.(piece);
    setDialog({
      isDialogActive: false
    });
  }, [dialog]);
  const value = (0, _react.useMemo)(() => ({
    showPromotionDialog,
    isPromoting: dialog.isDialogActive
  }), [dialog.isDialogActive, showPromotionDialog]);
  return /*#__PURE__*/_react.default.createElement(BoardPromotionContext.Provider, {
    value: value
  }, dialog.isDialogActive && /*#__PURE__*/_react.default.createElement(_dialog.PromotionDialog, _extends({
    type: "w"
  }, dialog, {
    onSelect: onSelect
  })), children);
});
//# sourceMappingURL=index.js.map