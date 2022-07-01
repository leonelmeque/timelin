import { css } from "styled-components";
import { unitsConverter } from "../../utils/units-converter";

export const _variants = {
    primary: css`
        background: hsl(324, 31%, 61%);
    `,
    secondary: "",
    tertiary: "",
};

export const _sizes = {
    sm: css`
        font-size:${unitsConverter(12)};
        padding: ${unitsConverter(12)};
        border-radius: ${unitsConverter(4)};
    `,
    md: css`
        font-size:${unitsConverter(16)};
        padding: ${unitsConverter(16)};
        border-radius: ${unitsConverter(5)};
    `,
    lg: css`
    font-size:${unitsConverter(16)};
        padding: ${unitsConverter(16)} ${unitsConverter(18)};
        border-radius: ${unitsConverter(4)};
    `,
};