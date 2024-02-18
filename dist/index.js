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
var _client = _interopRequireDefault(require("react-dom/client"));
require("./index.css");
var _Card = _interopRequireDefault(require("./lib/components/Card"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import Sandbox from "./Sandbox"

const array = [{
  title: "Title1",
  description: "Description1",
  image: "https://placehold.co/600x400"
}, {
  title: "Title2",
  description: "Description2",
  image: "https://placehold.co/600x400"
}, {
  title: "Title3",
  description: "Description3",
  image: "https://placehold.co/600x400"
}, {
  title: "Title4",
  description: "Description4",
  image: "https://placehold.co/600x400"
}];
_client.default.createRoot(document.getElementById("root")).render( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
  data: array,
  disposition: "LeftRight",
  isRounded: false,
  tension: 120,
  friction: 10,
  bgColor: "#e5e7eb"
})));