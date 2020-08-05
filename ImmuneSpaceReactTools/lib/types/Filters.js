"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class TotalCounts extends immutable_1.Record({
    study: 0,
    participant: 0
}) {
    constructor(params) {
        params ? super(params) : super();
    }
}
exports.TotalCounts = TotalCounts;
class SelectedFilter extends immutable_1.Record({
    members: immutable_1.List(),
    operator: "OR"
}) {
    constructor(params) {
        params ? super(immutable_1.fromJS(params)) : super();
    }
    with(values) {
        return this.merge(immutable_1.fromJS(values));
    }
}
exports.SelectedFilter = SelectedFilter;
class SelectedFilters extends immutable_1.Record({
    Subject: immutable_1.Map(),
    Study: immutable_1.Map(),
    Data: immutable_1.Map({
        Assay: immutable_1.Map(),
        Timepoint: immutable_1.Map(),
        SampleType: immutable_1.Map()
    })
}) {
    constructor(params) {
        if (params) {
            const subject = params.Subject ? immutable_1.Map(params.Subject).map(f => new SelectedFilter(f)) : immutable_1.Map();
            const study = params.Study ? immutable_1.Map(params.Study).map(f => new SelectedFilter(f)) : immutable_1.Map();
            const data = immutable_1.Map({
                Assay: (params.Data && params.Data.Assay) ? immutable_1.Map(params.Data.Assay).map(f => new SelectedFilter(f)) : immutable_1.Map(),
                Timepoint: (params.Data && params.Data.Timepoint) ? immutable_1.Map(params.Data.Timepoint).map(f => new SelectedFilter(f)) : immutable_1.Map(),
                SampleType: (params.Data && params.Data.SampleType) ? immutable_1.Map(params.Data.SampleType).map(f => new SelectedFilter(f)) : immutable_1.Map()
            });
            super({ Subject: subject, Study: study, Data: data });
        }
        else {
            super();
        }
    }
    with(values) {
        return this.merge(immutable_1.fromJS(values));
    }
}
exports.SelectedFilters = SelectedFilters;
class BannerInfo extends immutable_1.Record({
    groupName: "",
    counts: { study: 0, participant: 0 },
    unsavedFilters: false
}) {
    constructor(params) {
        params ? super(params) : super();
    }
    with(values) {
        return this.merge(values);
    }
}
exports.BannerInfo = BannerInfo;
