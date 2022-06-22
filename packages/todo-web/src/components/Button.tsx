import { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";

interface Props extends ComponentPropsWithoutRef<"button"> {
    label: string;
    variant: keyof typeof _variants;
    size: keyof typeof _sizes;
    fluid?: boolean;
}
// 186, 123, 161
// 324, 34, 73

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
        font-size: 1rem;
        padding: 1em;
        border-radius: 0.15em;
    `,
    lg: css`
        font-size: 1.25rem;
        padding: 1em 1.25em;
        border-radius: 0.15em;
    `,
};

const _Button = ({ className, label, ...rest }: Props) => (
    <button className={className} {...rest}>
        {label}
    </button>
);

export const Button = styled(_Button)<Omit<Props, "label">>`
    all: unset;
    ${(props) => _variants[props.variant]};
    ${(props) => _sizes[props.size]};
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background: #ba7da2dd;
    }
`;
