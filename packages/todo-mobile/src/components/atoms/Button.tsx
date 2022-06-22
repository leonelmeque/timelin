import React from 'react';
import {Pressable, PressableProps, Text} from 'react-native'
import styled, {css} from 'styled-components/native'
interface ButtonProps extends PressableProps {
    label: string;
    variant: keyof typeof _variants;
    size: keyof typeof _sizes;
    fluid?: boolean;
}

const _variants = {
    primary: css`
        background: hsl(324, 31%, 61%);
    `,
    secondary: "",
    tertiary: "",
};

const _sizes = {
    sm: css`
        font-size: 0.85rem;
        padding: 0.725em;
        border-radius: 0.125em;
    `,
    md: css`
        font-size: 16px;
        padding: 16px;
        border-radius: 2.4px;
    `,
    lg: css`
        font-size: 1.25rem;
        padding: 1em 1.25em;
        border-radius: 0.15em;
    `,
};

const Label = styled(Text)`
    color: white;
    font-weight: bold;
`;
 
const _Button = ({label,style,...rest}:ButtonProps) => {
    return (
        <Pressable style={style} {...rest}>
            <Label>{label}</Label>
        </Pressable>
    );
}


export const Button = styled(_Button)<Omit<ButtonProps, "label">>`
    all: unset;
    ${(props) => _variants[props.variant]};
    ${(props) => _sizes[props.size]};
    cursor: pointer;
    &:hover {
        background: #ba7da2dd;
    }
`;


 
export default Button;