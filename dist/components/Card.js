"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.symbol.description.js");
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
    isRounded,
    tension,
    friction
  } = _ref;
  const isMobile = (0, _reactResponsive.useMediaQuery)({
    query: "(max-width: 640px)"
  });
  const activeCardRef = (0, _react.useRef)(null);
  const parentCard = (0, _react.useRef)(null);

  // NOTE: default content div classes
  const cardDivClass = "col-span-3 flex justify-center items-center duration-100";
  const miniCardDivClass = "col-span-2 gap-4 flex justify-center items-center duration-100";
  const miniCardClass = "hover:scale-125 duration-200 cursor-pointer flex justify-center items-center max-sm:w-[4rem] max-sm:h-[4rem] w-[5rem] h-[5rem] shadow-lg";

  // Define card data
  const initialCardDimensions = {
    width: "6rem",
    height: "6rem"
  };

  // NOTE: assign the data to the cards

  const newArray = data.map(item => _objectSpread(_objectSpread({}, initialCardDimensions), item));
  const [cards, setCards] = (0, _react.useState)(newArray);

  // active card
  const [activeCard, setActiveCard] = (0, _react.useState)(data[0].title);
  (0, _react.useEffect)(() => {
    handleCardClick(activeCard);
    const handleLocalStorageUpdate = () => {
      try {
        const updatedArray = JSON.parse(localStorage.getItem("data")).map(item => _objectSpread(_objectSpread({}, initialCardDimensions), item));
        setCards(updatedArray);
        setActiveCard(updatedArray[0].title);
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    };
    window.addEventListener("DataChange", handleLocalStorageUpdate);
    return () => {
      window.removeEventListener("DataChange", handleLocalStorageUpdate);
    };
  }, [data, activeCard, isMobile]);

  // Handle card click and update dimensions
  const handleCardClick = cardKey => {
    const updatedCards = cards.map(card => {
      return _objectSpread(_objectSpread({}, card), {}, {
        width: cardKey === card.title ? isMobile ? "11rem" : "20rem" : initialCardDimensions.width,
        height: cardKey === card.title ? isMobile ? "11rem" : "20rem" : initialCardDimensions.height
      });
    });
    setCards(updatedCards);
    setActiveCard(cardKey);
  };

  // NOTE: Animated styles for each card
  const animatedStyles = Object.keys(cards).reduce((acc, cardKey) => {
    acc[cardKey] = (0, _web.useSpring)({
      to: {
        width: cards[cardKey[0]].width.toString(),
        height: cards[cardKey[0]].height.toString(),
        backgroundColor: bgColor
      },
      config: {
        tension: tension,
        friction: friction
      }
    });
    return acc;
  }, {});

  // NOTE: parent classNames of the animated cards
  const getCardClasses = key => {
    key = Number(key);
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
        return "lol";
    }
  };

  // NOTE: classNames for the disposition
  const getDisposition = disposition => {
    switch (disposition) {
      case "LeftRight":
        return "".concat(isMobile ? "flex flex-col justify-center items-center gap-8 h-full" : "grid grid-cols-5 h-full");
      case "RightLeft":
        return "".concat(isMobile ? "flex flex-col-reverse justify-center items-center gap-8 h-full" : "grid grid-cols-5 h-full");
      case "TopBottom":
        return "flex flex-col justify-center items-center gap-8 h-full";
      case "BottomTop":
        return "flex flex-col-reverse justify-center items-center gap-8 h-full";
      default:
        return "grid grid-cols-5 h-full";
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: getDisposition(disposition)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (disposition === "LeftRight" ? "order-1" : "order-2") + " ".concat(cardDivClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, Object.entries(cards).map(_ref2 => {
    let [key, value] = _ref2;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: key,
      className: getCardClasses(key),
      ref: parentCard
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_web.animated.div, {
      ref: activeCard === value.title ? activeCardRef : null,
      style: animatedStyles[key],
      onClick: () => handleCardClick(value.title),
      className: "".concat(activeCard === value.title ? "px-6 py-4" : "flex justify-center items-center", " cursor-pointer duration-100 ").concat(isRounded ? " rounded-2xl" : " rounded-none")
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(activeCard === value.title ? "min-h-full" : "max-sm:space-y-1 space-y-3")
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "flex max-sm:flex-col-reverse justify-between items-center"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: (activeCard === value.title ? "max-sm:text-xl text-5xl" : "max-sm:text-xs text-base") + " capitalize font-bold duration-100"
    }, value.title), activeCard === value.title && value.image != null && /*#__PURE__*/_react.default.createElement("img", {
      className: "max-sm:w-12 max-sm:h-12 w-20 h-20",
      src: value.image,
      alt: "imageCard"
    })), activeCard === value.title && /*#__PURE__*/_react.default.createElement("p", {
      className: "line-clamp-[8] text-justify max-sm:text-xs"
    }, value.description)))));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: (disposition === "RightLeft" ? "order-1" : "order-2") + " ".concat(miniCardDivClass)
  }, Object.entries(cards).map(_ref3 => {
    let [key, value] = _ref3;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: key,
      onClick: () => handleCardClick(value.title),
      className: "".concat(activeCard === value.title ? "scale-105 shadow-xl" : "scale-90", " ").concat(miniCardClass, " ").concat(isRounded ? "rounded-2xl" : "rounded-none")
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "text-center text-xs capitalize"
    }, value.title));
  })));
};
Card.propTypes = {
  data: _propTypes.default.array.isRequired
};
Card.defaultProps = {
  disposition: "LeftRight",
  bgColor: "#e5e7eb",
  isRounded: false,
  tension: 120,
  friction: 10
};
var _default = exports.default = Card;