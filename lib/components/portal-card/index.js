"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _button = _interopRequireDefault(require("@alifd/next/lib/button"));

var _react = _interopRequireDefault(require("react"));

var PortalCard = function PortalCard(props) {
  var title = props.title,
      description = props.description,
      backgroundImage = props.backgroundImage;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "portal-card",
    style: {
      background: "url(" + backgroundImage + ")"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", null, title), /*#__PURE__*/_react["default"].createElement("div", null, description), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "normal"
  }, "\u8BE6\u60C5")));
};

PortalCard.defaultProps = {
  title: 'title',
  description: 'description'
};
var _default = PortalCard;
exports["default"] = _default;