import * as React from 'react';
import { Filter } from '../../typings/CubeData'

// Types 
export interface FilterDropdownProps {
    dimension: string;
    level: string;
    members: string[];
    filterClick: (dim: string, filter: Filter) => () => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = (props: FilterDropdownProps) => {
    return (
        <div className={"dropdown"}>
            <div className="btn-group filterselector" role="group" >
                <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">
                    <span>{props.level}</span>
                    <span>&#9660;</span>
                </button>
                <div className="dropdown-menu filter-dropdown">
                    <div id={props.level} className="form-group">
                        {props.members.map((e) => {
                            // debugger;
                            return (
                                <div className="checkbox" key={e}>
                                    <label >
                                        <input onClick={props.filterClick(props.dimension, {level: props.level, member: e})} type="checkbox" name={props.level} value={e}/>
                                        <span>{e}</span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}