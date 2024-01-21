"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.reduce.js");
var _react = _interopRequireWildcard(require("react"));
var _web = require("@react-spring/web");
var _reactResponsive = require("react-responsive");
require("../index.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

const Card = () => {
  const isMobile = (0, _reactResponsive.useMediaQuery)({
    query: "max-width: 600px"
  });
  const activeCardRef = (0, _react.useRef)(null);
  const parentCard = (0, _react.useRef)(null);

  // Define card states
  const initialCardDimensions = {
    width: "6rem",
    height: "6rem"
  };
  const [cards, setCards] = (0, _react.useState)({
    feu: initialCardDimensions,
    water: initialCardDimensions,
    wind: initialCardDimensions,
    quake: initialCardDimensions
  });
  const [activeCard, setActiveCard] = (0, _react.useState)("feu");

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

  // Update active card ref
  (0, _react.useEffect)(() => {
    handleCardClick(activeCard);
  }, [activeCard]);

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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-5 h-screen"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-3 flex justify-center items-center"
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
    className: (activeCard === cardKey ? "px-6 py-4 rounded-2xl" : "flex justify-center items-center rounded-2xl") + " cursor-pointer bg-blue-500"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: (activeCard === cardKey ? "text-5xl" : "text-base") + " capitalize font-bold duration-500"
  }, cardKey), activeCard === cardKey && /*#__PURE__*/_react.default.createElement("div", {
    className: "w-20 h-20 text-center bg-green-500"
  }, "Icon or image here")), activeCard === cardKey && /*#__PURE__*/_react.default.createElement("p", {
    className: "line-clamp-[8] text-justify"
  }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt possimus assumenda sequi nihil, pariatur, aliquid molestias harum aliquam aut eum incidunt, amet accusantium numquam reiciendis. Dicta architecto quibusdam aspernatur laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quasi ipsum fuga ex harum reprehenderit, tempora a alias nisi dignissimos inventore quia eum modi molestiae perspiciatis ducimus optio minus nostrum."))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-2 gap-4 flex justify-center items-center"
  }, Object.keys(cards).map(cardKey => /*#__PURE__*/_react.default.createElement("div", {
    key: cardKey,
    onClick: () => handleCardClick(cardKey),
    className: (activeCard === cardKey ? "scale-110 shadow-xl" : "scale-90") + " hover:scale-125 duration-200 cursor-pointer flex justify-center items-center w-[5rem] h-[5rem] shadow-md rounded-2xl"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "text-center text-xs capitalize"
  }, cardKey)))));
};
var _default = exports.default = Card;