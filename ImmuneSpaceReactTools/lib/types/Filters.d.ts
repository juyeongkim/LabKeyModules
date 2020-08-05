import { List, Record, Map } from 'immutable';
declare const TotalCounts_base: Record.Class;
export declare class TotalCounts extends TotalCounts_base {
    study: number;
    participant: number;
    constructor(params?: {
        study?: number;
        participant?: number;
    });
}
export interface Filter {
    level: string;
    member: string;
}
export interface ISelectedFilter {
    members?: string[] | List<string>;
    operator?: string;
}
declare const SelectedFilter_base: Record.Class;
export declare class SelectedFilter extends SelectedFilter_base {
    members: List<string>;
    operator: string;
    constructor(params?: ISelectedFilter);
    with(values: ISelectedFilter): this;
}
export interface ISelectedFilters {
    Subject?: {
        [index: string]: SelectedFilter;
    };
    Study?: {
        [index: string]: SelectedFilter;
    };
    Data?: {
        [index: string]: {
            [index: string]: SelectedFilter;
        };
    };
}
declare const SelectedFilters_base: Record.Class;
export declare class SelectedFilters extends SelectedFilters_base {
    Subject: Map<string, SelectedFilter>;
    Study: Map<string, SelectedFilter>;
    Data: Map<string, Map<string, SelectedFilter>>;
    constructor(params?: ISelectedFilters);
    with(values: ISelectedFilters): this;
}
export interface FilterQuery {
    level: string;
    membersQuery: {
        level: string;
        members: string[] | string;
    }[];
}
export interface IBannerInfo {
    groupName?: string;
    counts?: TotalCounts;
    unsavedFilters?: boolean;
}
declare const BannerInfo_base: Record.Class;
export declare class BannerInfo extends BannerInfo_base {
    groupName: string;
    counts: TotalCounts;
    unsavedFilters: boolean;
    constructor(params?: IBannerInfo);
    with(values: IBannerInfo): this;
}
export interface FilterCategory {
    label: string;
    sortorder: number;
}
export interface FilterCategories {
    [index: string]: FilterCategory[];
}
export {};
