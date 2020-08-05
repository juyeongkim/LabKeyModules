"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const immutable_1 = require("immutable");
require("./FilterSummary.scss");
// Filter stuff... ========================================================
exports.FilterSummary = (props) => {
    // if (props.filters.subject.size != 0) debugger;
    return (React.createElement("div", { className: "row filterbar" },
        React.createElement("div", { className: "col-sm-4" },
            React.createElement(exports.FilterIndicatorList, { filterClass: "Study", filters: props.filters.Study, title: "Study Design", indicateNoFilters: true })),
        React.createElement("div", { className: "col-sm-4" },
            React.createElement(exports.FilterIndicatorList, { filterClass: "Subject", filters: props.filters.Subject, title: "Participant Characteristics", indicateNoFilters: true })),
        React.createElement("div", { className: "col-sm-4" },
            React.createElement(exports.AssayFilterIndicatorList, { filters: props.filters.Data, title: "Assay Data", indicateNoFilters: true }))));
};
exports.AssayFilterIndicatorList = ({ filters, title, indicateNoFilters }) => {
    let filterFlags;
    if (filters.size == 0 ||
        (filters.getIn(["Assay", "Timepoint"]) == undefined &&
            filters.getIn(["Assay", "Assay"]) == undefined &&
            filters.getIn(["Assay", "SampleType"]) == undefined &&
            filters.getIn(["SampleType", "SampleType"]) == undefined &&
            filters.getIn(["SampleType", "Assay"]) == undefined &&
            filters.getIn(["Timepoint", "Timepoint"]) == undefined &&
            filters.getIn(["Timepoint", "SampleType"]) == undefined)) {
        if (indicateNoFilters) {
            filterFlags = React.createElement("em", { className: "filter-indicator no-filters" }, "No filters currently applied");
        }
        else {
            filterFlags = React.createElement(React.Fragment, null);
        }
    }
    else {
        // These should be in the same order as the filter indicators in the banner
        const filterMap = immutable_1.Map({
            "Assay.Assay": filters.getIn(["Assay", "Assay"]),
            "Assay.Timepoint": filters.getIn(["Assay", "Timepoint"]),
            "Assay.SampleType": filters.getIn(["Assay", "SampleType"]),
            "Timepoint.Timepoint": filters.getIn(["Timepoint", "Timepoint"]),
            "Timepoint.SampleType": filters.getIn(["Timepoint", "SampleType"]),
            "SampleType.SampleType": filters.getIn(["SampleType", "SampleType"]),
            "SampleType.Assay": filters.getIn(["SampleType", "Assay"]),
        });
        const prefixes = {
            "Assay.Assay": "Assays: ",
            "Assay.Timepoint": "Assays at Timepoint: ",
            "Assay.SampleType": "Assays at Timepoint for Sample Type: ",
            "Timepoint.Timepoint": "Timepoints: ",
            "Timepoint.SampleType": "Timepoints for Sample Type: ",
            "SampleType.SampleType": "Sample Types: ",
            "SampleType.Assay": "Assays for Sample Type: ",
        };
        const filterText = filterMap.map((e, i) => {
            if (e === undefined)
                return (undefined);
            const getText = (m, level) => {
                if (level == "Assay.SampleType") {
                    const assay = m.split(/\./)[0];
                    const timepoint = m.split(/\./)[1];
                    const sampleType = m.split(/\./)[2];
                    return (assay + " at Day " + timepoint + " for " + sampleType);
                }
                if (level == "Assay.Timepoint") {
                    const assay = m.split(/\./)[0];
                    const timepoint = m.split(/\./)[1];
                    return (assay + " at Day " + timepoint);
                }
                if (level == "SampleType.Assay") {
                    const assay = m.split(/\./)[1];
                    const sampleType = m.split(/\./)[0];
                    return (assay + " for " + sampleType);
                }
                if (level == "Timepoint.Timepoint") {
                    return "Day " + m;
                }
                if (level == "Timepoint.SampleType") {
                    const timepoint = m.split(/\./)[0];
                    const sampleType = m.split(/\./)[1];
                    return "Day " + timepoint + " for " + sampleType;
                }
                return (m);
            };
            const textArray = e.get("members").map((m) => getText(m, i));
            return (textArray.join(" " + e.get("operator") + " "));
        });
        filterFlags = filterText.map((text, i) => {
            if (text == undefined)
                return (undefined);
            return (React.createElement(exports.Flag, { dim: "Data" },
                React.createElement("b", null, prefixes[i]),
                text));
        }).valueSeq();
    }
    return (React.createElement("div", null,
        title && React.createElement("h4", null, title),
        filterFlags));
};
exports.FilterIndicatorList = ({ filterClass, filters, title, indicateNoFilters }) => {
    // props: filter class, filters, title text
    let filterFlags;
    // debugger;
    if (filters.size == 0) {
        if (indicateNoFilters) {
            filterFlags = React.createElement("em", { className: "filter-indicator no-filters" }, "No filters currently applied");
        }
        else {
            filterFlags = React.createElement(React.Fragment, null);
        }
    }
    else {
        const filterKeys = filters.keySeq();
        filterFlags = filterKeys.map((key) => {
            return (React.createElement(FilterIndicatorFlag, { key: filters.getIn([key, "members"]), dim: filterClass, filter: filters.get(key), level: key }));
        });
    }
    return (React.createElement("div", null,
        title && React.createElement("h4", null, title),
        filterFlags));
};
exports.Flag = ({ dim, children }) => {
    return (React.createElement("div", { className: "filter-indicator " + dim }, children));
};
const FilterIndicatorFlag = ({ dim, filter, level }) => {
    const text = filter.members.join(" " + filter.operator + " ");
    return (React.createElement(exports.Flag, { dim: dim },
        React.createElement("b", null,
            level,
            ": "),
        text));
};
exports.FilterDeletor = ({ dim, onDelete, children }) => {
    return React.createElement("div", { className: "filter-deletor " + dim, onClick: onDelete },
        React.createElement("span", null, children),
        React.createElement("i", { className: "fa fa-times" }));
};
