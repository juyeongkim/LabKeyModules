"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Dropdowns.scss");
// This essentially just creates a bootstrap button dropdown
exports.SimpleDropdown = ({ title, buttonData, disabled, id }) => {
    return (React.createElement("div", { className: "dropdown df-outer-dropdown", id: id },
        React.createElement("div", { className: "btn", role: "group" },
            React.createElement("button", { className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown", type: "button", disabled: disabled },
                React.createElement("span", null, title),
                React.createElement("span", { style: { paddingLeft: "5px" } },
                    React.createElement("i", { className: "fa fa-caret-down" }))),
            React.createElement("ul", { className: "dropdown-menu df-dropdown" }, buttonData === null || buttonData === void 0 ? void 0 : buttonData.map((button) => {
                return (React.createElement("li", { key: button.label, className: "df-dropdown-option" },
                    React.createElement("a", { style: { padding: "0px 5px" }, onClick: button.action, href: button.href }, button.label)));
            })))));
};
// Dropdown with nesting option
exports.DropdownButtons = ({ title, buttonData, disabled, id }) => {
    return (React.createElement(exports.OuterDropdownButton, { title: title, disabled: disabled, id: id },
        React.createElement(DropdownContent, { buttonData: buttonData })));
};
exports.OuterDropdownButton = ({ children, disabled, title, id }) => {
    const openRef = React.useRef(null);
    const open = () => {
        const cl = openRef.current.classList;
        const willOpen = !cl.contains("open");
        for (let el of document.querySelectorAll(".df-outer-dropdown>.open")) {
            el.classList.remove("open");
        }
        ;
        if (willOpen) {
            cl.add("open");
        }
    };
    return (React.createElement("div", { className: "dropdown df-outer-dropdown", id: id },
        React.createElement("div", { className: "btn", ref: openRef, role: "group" },
            React.createElement("button", { className: "btn btn-default dropdown-toggle", type: "button", disabled: disabled, onClick: open },
                React.createElement("span", null, title),
                React.createElement("span", null,
                    React.createElement("i", { className: "fa fa-caret-down" }))),
            children)));
};
exports.InnerDropdownButtons = ({ title, buttonData }) => {
    const [open, setOpen] = React.useState(false);
    return (React.createElement("div", { className: "dropdown df-sub-dropdown" },
        React.createElement("div", { className: open ? " open" : "", role: "group" },
            React.createElement("button", { type: "button", onClick: () => { setOpen(!open); } },
                React.createElement("span", null, title),
                React.createElement("span", { style: { paddingLeft: "5px" } },
                    React.createElement("i", { className: "fa fa-caret-" + (open ? "down" : "right") }))),
            React.createElement(InnerDropdownContent, { buttonData: buttonData, open: open }))));
};
const DropdownContent = ({ buttonData }) => {
    return React.createElement("ul", { className: "dropdown-menu df-dropdown" }, buttonData.map((button) => {
        return (React.createElement("li", { key: button.label, className: "df-dropdown-option " + (button.disabled ? "disabled" : "") }, (() => {
            var _a;
            if (button.buttonData) {
                return (React.createElement(exports.InnerDropdownButtons, { title: button.label, buttonData: button.buttonData }));
            }
            else {
                return React.createElement("a", { style: { padding: "0px 5px" }, key: button.label, href: button.href },
                    React.createElement("button", { onClick: (_a = button.action) !== null && _a !== void 0 ? _a : (() => { }) },
                        button.label,
                        button.icon));
            }
        })()));
    }));
};
const InnerDropdownContent = ({ buttonData, open }) => {
    return React.createElement("ul", { className: "dropdown-menu df-dropdown", style: open ? { display: "contents" } : {} }, buttonData.map((button) => {
        return (React.createElement("li", { key: button.label, className: "df-dropdown-option " + (button.disabled ? "disabled" : "") }, (() => {
            var _a;
            if (button.buttonData) {
                return (React.createElement(exports.InnerDropdownButtons, { title: button.label, buttonData: button.buttonData }));
            }
            else {
                return React.createElement("a", { style: { padding: "0px 5px", marginLeft: "20px" }, key: button.label, href: button.href },
                    React.createElement("button", { onClick: (_a = button.action) !== null && _a !== void 0 ? _a : (() => { }) },
                        button.label,
                        button.icon));
            }
        })()));
    }));
};
