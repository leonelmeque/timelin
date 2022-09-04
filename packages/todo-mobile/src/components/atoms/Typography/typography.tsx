import { Text } from 'react-native'
import styled from 'styled-components/native'
import { typography } from '../../../tokens'

const StyledText = styled(Text)<{
  size: keyof typeof typography.sizes
  weight: 'bold' | 'regular'
}>`
  font-size: ${(props) => props.theme.typography.sizes[props.size]};
  font-weight: ${(props) => props.weight};
`

const Typography = StyledText

export default Typography
