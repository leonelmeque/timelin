import styled from "styled-components";
import { baseInputStyles } from "../../shared/commonStyles/input";

export default styled.input`
    ${baseInputStyles};
    outline: none;
    &:focus {
        outline: hsla(120 60% 90% / 1) solid 2px;
    }
`;
