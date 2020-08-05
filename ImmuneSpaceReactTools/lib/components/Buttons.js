"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Buttons.scss");
// Button or link with highlighted style
exports.HighlightedButton = ({ href, action, id, disabled, children }) => {
    return React.createElement("a", { href: href, className: "btn df-highlighted-button" + (disabled ? " disabled" : ""), onClick: action, id: id }, children);
};
// export const HighlightedButton = React.memo(HighlightedButtonFC)
// Floats all children in a nice little row
exports.RowOfButtons = ({ children, id }) => {
    return React.createElement("div", { className: "df-row-of-buttons", id: id }, React.Children.map(children || null, (child, i) => {
        return (React.createElement("div", { style: { float: "left", padding: "3px 10px" } }, child));
    }));
};
