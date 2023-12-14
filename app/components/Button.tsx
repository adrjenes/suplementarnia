"use client"

import React from "react";
import {IconType} from "react-icons";
import {Icon} from "@mui/material";

interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    custom?: string;
    icon?: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    custom,
    icon: Icon,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
            
            hover:bg-green-700
            font-sans
            transition
            w-full
            border-green-600
            hover:border-green-700
            hover:text-white
            flex
            items-center
            justify-center
            gap-2
            ${outline ? "bg-white" : "bg-green-600"}
            ${outline ? "text-green-700" : "text-white"}
            ${small ? "text-sm font-light" : "text-md font-semibold"}
            ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
            ${custom ? custom : ''}
            h-12
            w-96
            `}
        >
            {label}
            {Icon && <Icon size={24}/>}
        </button>
    );
};
export default Button;