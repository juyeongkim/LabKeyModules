import * as React from 'react';
import "./Dropdowns.scss";
interface ButtonData {
    label: string;
    icon?: JSX.Element;
    action?: () => void;
    disabled?: boolean;
    href?: string;
    buttonData?: ButtonData[];
}
interface DropdownButtonProps {
    title: string;
    buttonData: ButtonData[];
    disabled?: boolean;
    id?: string;
}
interface OuterDropdownButtonProps {
    disabled?: boolean;
    title: string;
    id?: string;
}
export declare const SimpleDropdown: React.FC<DropdownButtonProps>;
export declare const DropdownButtons: React.FC<DropdownButtonProps>;
export declare const OuterDropdownButton: React.FC<OuterDropdownButtonProps>;
export declare const InnerDropdownButtons: React.FC<DropdownButtonProps>;
export {};
