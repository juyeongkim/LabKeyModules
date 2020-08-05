import * as React from 'react';
import "./Buttons.scss";
interface HighlightedButtonProps {
    action?: () => void;
    href?: string;
    id?: string;
    disabled?: boolean;
}
interface RowOfButtonProps {
    id?: string;
}
export declare const HighlightedButton: React.FC<HighlightedButtonProps>;
export declare const RowOfButtons: React.FC<RowOfButtonProps>;
export {};
