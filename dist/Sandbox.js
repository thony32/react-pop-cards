"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
var _Card = _interopRequireDefault(require("./components/Card"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function checkForDuplicates(array) {
  let valuesAlreadySeen = [];
  for (let i = 0; i < array.length; i++) {
    let value = array[i];
    if (valuesAlreadySeen.indexOf(value) !== -1) {
      return true;
    }
    valuesAlreadySeen.push(value);
  }
  return false;
}
const Sandbox = () => {
  const array = ["Un", "Deux", "Trois", "Quatre"];
  const [disposition, setDisposition] = (0, _react.useState)("");
  const [radius, setRadius] = (0, _react.useState)();
  const [code, setCode] = (0, _react.useState)("<Card data={array} />");
  function handleData() {
    var data = document.getElementById("dataInputRef").value.split(',');
    if (data.length !== 4) {
      alert('Only 4 letters');
    } else {
      if (checkForDuplicates(data)) {
        alert("Duplicate letters");
      } else {
        localStorage.setItem("data", JSON.stringify(data));
        window.dispatchEvent(new Event('DataChange'));
      }
    }
  }
  const handleDispositionChange = event => {
    const newDisposition = event.target.value;
    setDisposition(newDisposition);
    updateCode(newDisposition, radius);
  };
  const handleRadiusChange = () => {
    setRadius(!radius);
    updateCode(disposition, !radius);
  };
  const updateCode = (newDisposition, newIsRounded) => {
    console.log(newDisposition);
    console.log(newIsRounded);
    if (newDisposition !== null) {
      setCode("<Card data={array} disposition=\"".concat(newDisposition, "\" />"));
    }
    if (newIsRounded !== undefined) {
      setCode("<Card data={array} isRounded=".concat(newIsRounded, " />"));
    }
    if (newDisposition !== "" && newIsRounded !== undefined) {
      setCode("<Card data={array} disposition=\"".concat(newDisposition, "\" isRounded={").concat(newIsRounded, "} />"));
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "space-y-5 p-8"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-3 p-8 flex gap-[5%]"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    className: "form-control w-full max-w-xs"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-xl font-bold"
  }, "Data")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "dataInputRef",
    type: "text",
    placeholder: array.join(','),
    className: "input input-bordered w-full max-w-xs"
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => handleData(),
    className: "btn btn-info"
  }, "Set")), /*#__PURE__*/_react.default.createElement("div", {
    className: "label"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "label-text-alt"
  }, "S\xE9parer par ", /*#__PURE__*/_react.default.createElement("kbd", {
    className: "kbd kbd-xs"
  }, ","), " (ex: un,deux,trois,quatre)")))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-xl font-bold"
  }, "Disposition (default : LeftRight)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label cursor-pointer space-x-5"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "label-text"
  }, "Left to right"), /*#__PURE__*/_react.default.createElement("input", {
    value: "LeftRight",
    type: "radio",
    name: "radio-10",
    className: "radio checked:bg-blue-500",
    checked: disposition === "LeftRight",
    onChange: handleDispositionChange
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label cursor-pointer space-x-5"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "label-text"
  }, "Right to left"), /*#__PURE__*/_react.default.createElement("input", {
    value: "RightLeft",
    type: "radio",
    name: "radio-10",
    className: "radio checked:bg-blue-500",
    checked: disposition === "RightLeft",
    onChange: handleDispositionChange
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label cursor-pointer space-x-5"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "label-text"
  }, "Top to bottom"), /*#__PURE__*/_react.default.createElement("input", {
    value: "TopBottom",
    type: "radio",
    name: "radio-10",
    className: "radio checked:bg-blue-500",
    checked: disposition === "TopBottom",
    onChange: handleDispositionChange
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "label cursor-pointer space-x-5"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "label-text"
  }, "Bottom to top"), /*#__PURE__*/_react.default.createElement("input", {
    value: "BottomTop",
    type: "radio",
    name: "radio-10",
    className: "radio checked:bg-blue-500",
    checked: disposition === "BottomTop",
    onChange: handleDispositionChange
  })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-xl font-bold"
  }, "Radius (default : false)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "cursor-pointer label space-x-5"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "label-text"
  }, "Is Rounded"), /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    onClick: () => handleRadiusChange(),
    className: "checkbox checkbox-info"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-2 p-8"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-3xl font-bold mb-3"
  }, "Code preview"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "mockup-code"
  }, /*#__PURE__*/_react.default.createElement("pre", null, /*#__PURE__*/_react.default.createElement("code", {
    id: "code"
  }, code)))))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Card.default, {
    data: array,
    disposition: disposition,
    isRounded: radius
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", {
    className: "mb-3 text-2xl text-center font-medium"
  }, "Installation"), /*#__PURE__*/_react.default.createElement("div", {
    className: "mockup-code"
  }, /*#__PURE__*/_react.default.createElement("pre", {
    "data-prefix": "$"
  }, /*#__PURE__*/_react.default.createElement("code", null, "bun install rajoelina-js")), /*#__PURE__*/_react.default.createElement("pre", null, /*#__PURE__*/_react.default.createElement("code", null, "or")), /*#__PURE__*/_react.default.createElement("pre", {
    "data-prefix": "$"
  }, /*#__PURE__*/_react.default.createElement("code", null, "pnpm i rajoelina-js")), /*#__PURE__*/_react.default.createElement("pre", null, /*#__PURE__*/_react.default.createElement("code", null, "or")), /*#__PURE__*/_react.default.createElement("pre", {
    "data-prefix": "$"
  }, /*#__PURE__*/_react.default.createElement("code", null, "npm i rajoelina-js"))))));
};
var _default = exports.default = Sandbox;