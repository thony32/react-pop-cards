"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
require("./index.css");
var _Sandbox = _interopRequireDefault(require("./Sandbox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import Card from './components/Card';

// const array = ["Un", "Deux", "Trois", "Quatre"]

_client.default.createRoot(document.getElementById('root')).render( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_Sandbox.default, null)));

// export { Card }