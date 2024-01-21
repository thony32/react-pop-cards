"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function get() {
    return _Card.default;
  }
});
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
require("./index.css");
var _Card = _interopRequireDefault(require("./components/Card"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const array = ["Un", "Deux", "Trois", "Quatre"];
_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
  data: array,
  bgColor: "bg-red-500"
})), document.getElementById("root"));