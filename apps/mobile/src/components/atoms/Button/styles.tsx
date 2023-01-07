import { Text } from 'react-native'
import styled, { css } from 'styled-components/native'
import { typography } from '../../../tokens'
import { unitsConverter } from '../../../utils/uiUtils'

export const _variants = {
  primary: css`
    background: ${(props) => props.theme.colours.primary};
    color: ${(props) => props.theme.colours.white};
  `,
  secondary: css`
    background: ${(props) => props.theme.colours.accent};
    color: ${(props) => props.theme.colours.dark};
  `,
  tertiary: css``,
  danger: css`
    background-color: ${(props) => props.theme.colours.danger};
    color: ${(props) => props.theme.colours.white};
  `,
}

export const _sizes = {
  sm: css`
    font-size: ${(props) => props.theme.typography.sizes.small}px;
    padding: ${(props) => props.theme.sizes.small}px;
    border-radius: ${(props) => props.theme.sizes.small / 2}px;
  `,
  md: css`
    font-size: ${(props) => props.theme.typography.sizes.body}px;
    padding: ${(props) => props.theme.sizes.medium}px;
    border-radius: ${(props) => props.theme.sizes.medium / 2}px;
  `,
  lg: css`
    font-size: ${unitsConverter(typography.sizes.large)};
    padding: ${unitsConverter(24)} ${unitsConverter(16)};
    border-radius: ${unitsConverter(4)};
  `,
}

export const Label = styled(Text)`
  color: white;
  font-weight: bold;
  text-align: center;
`
