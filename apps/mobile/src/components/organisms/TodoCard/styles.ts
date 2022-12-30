import { View, Text } from 'react-native'
import styled, { css } from 'styled-components/native'

export const TodoCardContainer = styled(View)<{ cardColor?: string }>`
  padding: ${(props) => props.theme.sizes.medium}px;
  background-color: ${(props) =>
    !props.cardColor ? props.theme.colours.primary : props.cardColor};
  border-radius: ${(props) => props.theme.sizes.small / 2}px;
`

const commonStyles = css`
  color: ${(props) => props.theme.colours.white};
`
export const TodoName = styled(Text)`
  ${commonStyles}
  font-size: ${(props) => props.theme.sizes.big}px;
  font-weight: bold;
  line-height: 23.4px;
`

export const TodoCreatingDate = styled(Text)`
  ${commonStyles}
`

export const TodoStatus = styled(Text)`
  ${commonStyles}
`
