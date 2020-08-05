import { Record, fromJS, List, Map } from 'immutable';
import { StudyParticipantCount } from './StudyCard';
import { TotalCounts, ISelectedFilters } from 'immunespace-react-tools'

export interface GroupInfo {
    id: number;
    label: string;
    selected: boolean;
    filters: {
        [index: string]: {
            members: string[];
            name: string;
            operator: string
        }
    } | ISelectedFilters;
    new?: boolean
}

export interface PlotDatum {
    level: string;
    member: string;
    participantCount?: number;
    studyCount?: number
}

export interface HeatmapDatum<data> {
    x: string;
    y: string;
    participantCount: number;
    studyCount: number;
    data: data;
}

export interface ISubjectData {
    Race?: PlotDatum[];
    Age?: PlotDatum[];
    Gender?: PlotDatum[];
    Species?: PlotDatum[];
    ExposureMaterial?: PlotDatum[];
    ExposureProcess?: PlotDatum[];
}

export class SubjectData extends Record({
    Race: List<PlotDatum>(),
    Age: List<PlotDatum>(),
    Gender: List<PlotDatum>(),
    Species: List<PlotDatum>(),
    ExposureMaterial: List<PlotDatum>(),
    ExposureProcess: List<PlotDatum>()
}) {
    Race: List<PlotDatum>;
    Age: List<PlotDatum>;
    Gender: List<PlotDatum>;
    Species: List<PlotDatum>;
    ExposureMaterial: List<PlotDatum>;
    ExposureProcess: List<PlotDatum>;

    constructor(params?: ISubjectData) {
        params ? super(fromJS(params)) : super()
    }
}

export interface IStudyData {
    Name?: PlotDatum[];
    Program?: PlotDatum[];
    Condition?: PlotDatum[];
    ResearchFocus: PlotDatum[];
    Species?: PlotDatum[];
    ExposureMaterial?: PlotDatum[];
    ExposureProcess?: PlotDatum[];
}

export class StudyData extends Record({
    Name: List<PlotDatum>(),
    Program: List<PlotDatum>(),
    Condition: List<PlotDatum>(),
    ResearchFocus: List<PlotDatum>(),
    Species: List<PlotDatum>(),
    ExposureMaterial: List<PlotDatum>(),
    ExposureProcess: List<PlotDatum>()
}) {
    Name: List<PlotDatum>;
    Program: List<PlotDatum>;
    Condition: List<PlotDatum>;
    Species: List<PlotDatum>;
    ExposureMaterial: List<PlotDatum>;
    ExposureProcess: List<PlotDatum>;

    constructor(params?: IStudyData) {
        params ? super(fromJS(params)) : super()
    }
}

export interface IAssayData {
    Assay?: {
        Assay?: PlotDatum[];
        Timepoint?: PlotDatum[];
        SampleType?: PlotDatum[];
    },
    Timepoint?: {
        Timepoint?: PlotDatum[];
        SampleType?: PlotDatum[];
    };
    SampleType?: {
        SampleType?: PlotDatum[];
        Assay?: PlotDatum[];
    };
}

export class AssayData extends Record({
    Assay: Map({
        Assay: List<PlotDatum>(),
        Timepoint: List<PlotDatum>(),
        SampleType: List<PlotDatum>(),
    }),
    Timepoint: Map({
        Timepoint: List<PlotDatum>(),
        SampleType: List<PlotDatum>()
    }),
    SampleType: Map({
        SampleType: List<PlotDatum>(),
        Assay: List<PlotDatum>()
    })
}) {
    Assay: Map<string, List<PlotDatum>>;
    Timepoint:  Map<string, List<PlotDatum>>;
    SampleType:  Map<string, List<PlotDatum>>;

    constructor(params?: ISubjectData) {
        params ? super(fromJS(params)) : super()
    }
}

export interface IPlotData {
    Subject?: SubjectData,
    Study?: StudyData,
    Data?: AssayData
}

export class PlotData extends Record({
    Subject: new SubjectData(),
    Study: new StudyData(),
    Data: new AssayData()
}) {
    Subject: SubjectData;
    Study: StudyData;
    Data: AssayData;


    constructor(params?: IPlotData) {
        params ? super(fromJS(params)) : super()
    }

    with(values: IPlotData) {
        return this.merge(fromJS(values)) as this;
    }

}

export class CubeData extends Record({
    plotData: new PlotData(),
    studyParticipantCounts: List(),
    totalCounts: new TotalCounts()
}) {
    plotData: PlotData;
    studyParticipantCounts: List<StudyParticipantCount>;
    totalCounts: TotalCounts

}