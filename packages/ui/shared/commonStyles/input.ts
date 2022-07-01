import { css } from "styled-components";
import { unitsConverter } from "../../utils/units-converter";

export const baseInputStyles = css`
    padding: ${unitsConverter(16)};
    border: ${unitsConverter(1)} solid grey;
    background-color: rgba(120,1,2,.1);
   
`