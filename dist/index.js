"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
require("./index.css");
var _Card = _interopRequireDefault(require("./components/Card"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import Sandbox from "./Sandbox";

const array = ["Un", "Deux", "Trois", "Quatre"];
_client.default.createRoot(document.getElementById('root')).render( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
  data: array
})));

// export { Card }