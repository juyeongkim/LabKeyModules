"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Greeter.scss");
const Greeter = ({ name }) => React.createElement("h1", null,
    "Hello ",
    name);
exports.default = Greeter;
