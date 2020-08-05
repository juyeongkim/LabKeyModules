"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const renderer = require("react-test-renderer");
const buttons = require("./Buttons");
const enzyme_1 = require("enzyme");
describe("<HighlightedButton />", () => {
    test("render with all props", () => {
        const tree = renderer.create(react_1.default.createElement(buttons.HighlightedButton, { label: "Click me!", action: jest.fn(), id: "this-id" })).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("change text", () => {
        const button = enzyme_1.mount(react_1.default.createElement(buttons.HighlightedButton, { action: jest.fn(), label: "Before" }));
        expect(button.text()).toEqual('Before');
        button.setProps({ label: "After" });
        expect(button.text()).toEqual("After");
    });
    test("id", () => {
        const button = enzyme_1.mount(react_1.default.createElement(buttons.HighlightedButton, { action: jest.fn(), label: "Button", id: "test-button" }));
        expect(button.find("#test-button").hostNodes().text()).toEqual("Button");
    });
    test("click", () => {
        const onClick = jest.fn();
        const button = enzyme_1.mount(react_1.default.createElement(buttons.HighlightedButton, { action: onClick, label: "Apply" }));
        expect(onClick.mock.calls.length).toBe(0);
        button.simulate("click");
        expect(onClick.mock.calls.length).toBe(1);
    });
    test("href", () => {
        const button = enzyme_1.mount(react_1.default.createElement(buttons.HighlightedButton, { href: "go-to-site", label: "Apply" }));
        expect(button.find('a[href="go-to-site"]').text()).toEqual("Apply");
    });
});
