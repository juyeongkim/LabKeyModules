"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./Loader.scss");
exports.Loader = ({ id }) => {
    return react_1.default.createElement("div", { id: id },
        react_1.default.createElement("div", { className: "loader" }));
};
