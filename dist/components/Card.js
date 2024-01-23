"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _web = require("@react-spring/web");
var _reactResponsive = require("react-responsive");
require("../index.css");
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable react-hooks/exhaustive-deps */ /* eslint-disable react-hooks/rules-of-hooks */
const Card = _ref => {
  let {
    data,
    bgColor,
    disposition,
    isRounded
  } = _ref;
  const isMobile = (0, _reactResponsive.useMediaQuery)({
    query: "max-width: 600px"
  });
  const activeCardRef = (0, _react.useRef)(null);
  const parentCard = (0, _react.useRef)(null);

  // default content div classes
  const cardDivClass = "col-span-3 flex justify-center items-center duration-100";
  const miniCardDivClass = "col-span-2 gap-4 flex justify-center items-center duration-100";
  const miniCardClass = "hover:scale-125 duration-200 cursor-pointer flex justify-center items-center w-[5rem] h-[5rem] shadow-md";

  // Define card data
  const initialCardDimensions = {
    width: "6rem",
    height: "6rem"
  };
  const convertedObject = data.reduce((acc, currentValue) => {
    acc[currentValue.toLowerCase()] = _objectSpread({}, initialCardDimensions);
    return acc;
  }, {});
  const [cards, setCards] = (0, _react.useState)(convertedObject);

  // active card
  const [activeCard, setActiveCard] = (0, _react.useState)(data[0].toLowerCase());
  (0, _react.useEffect)(() => {
    handleCardClick(activeCard);
    const handleLocalStorageUpdate = () => {
      try {
        const newData = JSON.parse(localStorage.getItem('data')).reduce((acc, currentValue) => {
          acc[currentValue.toLowerCase()] = _objectSpread({}, initialCardDimensions);
          return acc;
        }, {});
        setCards(newData);
      } catch (error) {
        console.error('Error parsing local storage data:', error);
      }
    };
    window.addEventListener('DataChange', handleLocalStorageUpdate);
    return () => {
      window.removeEventListener('DataChange', handleLocalStorageUpdate);
    };
  }, [data, activeCard, isMobile]);

  // Handle card click and update dimensions
  const handleCardClick = cardKey => {
    const updatedCards = Object.keys(cards).reduce((acc, key) => {
      acc[key] = cardKey === key ? {
        width: "20rem",
        height: isMobile ? "11rem" : "20rem"
      } : initialCardDimensions;
      return acc;
    }, {});
    setCards(updatedCards);
    setActiveCard(cardKey);
  };

  // Animated styles for each card
  const animatedStyles = Object.keys(cards).reduce((acc, card) => {
    acc[card] = (0, _web.useSpring)({
      to: {
        width: cards[card].width,
        height: cards[card].height
      },
      config: {
        tension: 120,
        friction: 10
      }
    });
    return acc;
  }, {});
  const getCardClasses = key => {
    switch (key) {
      case 0:
        return "flex justify-end items-end";
      case 1:
        return "flex items-end";
      case 2:
        return "flex justify-end";
      case 3:
        return "flex";
      default:
        return "";
    }
  };
  const getDisposition = disposition => {
    switch (disposition) {
      case "LeftRight":
        return "grid grid-cols-5 h-screen";
      case "RightLeft":
        return "grid grid-cols-5 h-screen";
      case "TopBottom":
        return "flex flex-col justify-center items-center gap-[10%] h-screen";
      case "BottomTop":
        return "flex flex-col-reverse justify-center items-center gap-[10%] h-screen";
      default:
        return "grid grid-cols-5 h-screen";
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: getDisposition(disposition)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (disposition === "LeftRight" ? "order-1" : "order-2") + " ".concat(cardDivClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, Object.keys(cards).map((cardKey, key) => /*#__PURE__*/_react.default.createElement("div", {
    key: cardKey,
    className: getCardClasses(key),
    ref: parentCard
  }, /*#__PURE__*/_react.default.createElement(_web.animated.div, {
    ref: activeCard === cardKey ? activeCardRef : null,
    style: animatedStyles[cardKey],
    onClick: () => handleCardClick(cardKey),
    className: "".concat(activeCard === cardKey ? "px-6 py-4" : "flex justify-center items-center", " cursor-pointer duration-100 ").concat(bgColor, " ").concat(isRounded ? " rounded-2xl" : " rounded-none")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: (activeCard === cardKey ? "text-5xl" : "text-base") + " capitalize font-bold duration-100"
  }, cardKey), activeCard === cardKey && /*#__PURE__*/_react.default.createElement("div", {
    className: "w-20 h-20 text-center bg-green-500"
  }, "Icon or image here")), activeCard === cardKey && /*#__PURE__*/_react.default.createElement("p", {
    className: "line-clamp-[8] text-justify"
  }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt possimus assumenda sequi nihil, pariatur, aliquid molestias harum aliquam aut eum incidunt, amet accusantium numquam reiciendis. Dicta architecto quibusdam aspernatur laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quasi ipsum fuga ex harum reprehenderit, tempora a alias nisi dignissimos inventore quia eum modi molestiae perspiciatis ducimus optio minus nostrum."))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: (disposition === "RightLeft" ? "order-1" : "order-2") + " ".concat(miniCardDivClass)
  }, Object.keys(cards).map(cardKey => /*#__PURE__*/_react.default.createElement("div", {
    key: cardKey,
    onClick: () => handleCardClick(cardKey),
    className: "".concat(activeCard === cardKey ? "scale-110 shadow-xl" : "scale-90", " ").concat(miniCardClass, " ").concat(isRounded ? "rounded-2xl" : "rounded-none")
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "text-center text-xs capitalize"
  }, cardKey)))));
};
Card.propTypes = {
  data: _propTypes.default.array.isRequired
};
Card.defaultProps = {
  disposition: 'LeftRight',
  bgColor: 'bg-gray-200',
  isRounded: false
};
var _default = exports.default = Card;