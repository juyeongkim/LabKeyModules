import * as React from 'react';
import { SelectedFilters, SelectedFilter } from "../types/Filters";
import { Map } from 'immutable';
import './FilterSummary.scss';
export interface FilterSummaryProps {
    filters: SelectedFilters;
}
interface FilterIndicatorListProps {
    filterClass: string;
    filters: Map<string, SelectedFilter>;
    title?: string;
    indicateNoFilters?: boolean;
}
interface AssayFilterIndicatorListProps {
    filters: Map<string, Map<string, SelectedFilter>>;
    title?: string;
    indicateNoFilters?: boolean;
}
export declare const FilterSummary: (props: FilterSummaryProps) => JSX.Element;
export declare const AssayFilterIndicatorList: React.FC<AssayFilterIndicatorListProps>;
export declare const FilterIndicatorList: React.FC<FilterIndicatorListProps>;
interface FlagProps {
    dim: string;
}
interface FilterDeletorProps {
    dim: string;
    onDelete: () => void;
}
export declare const Flag: React.FC<FlagProps>;
export declare const FilterDeletor: React.FC<FilterDeletorProps>;
export {};
