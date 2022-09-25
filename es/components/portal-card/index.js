import _Button from "@alifd/next/es/button";
import React from 'react';

var PortalCard = function PortalCard(props) {
  var title = props.title,
      description = props.description,
      backgroundImage = props.backgroundImage;
  return /*#__PURE__*/React.createElement("div", {
    className: "portal-card",
    style: {
      background: "url(" + backgroundImage + ")"
    }
  }, /*#__PURE__*/React.createElement("div", null, title), /*#__PURE__*/React.createElement("div", null, description), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Button, {
    type: "normal"
  }, "\u8BE6\u60C5")));
};

PortalCard.defaultProps = {
  title: 'title',
  description: 'description'
};
export default PortalCard;