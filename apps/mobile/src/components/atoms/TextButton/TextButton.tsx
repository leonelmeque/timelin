import { Pressable, PressableProps } from 'react-native'
import styled from 'styled-components/native'
import { typography } from '../../../tokens'
import Typography from '../Typography/typography'

interface Props extends PressableProps {
  size: keyof typeof typography.sizes
  weight: 'bold' | 'regular'
  children: string
}

const StyledPressable = styled(Pressable)`
  padding: ${(props) => props.theme.sizes.large}px;
`

const TextButton = ({ size, weight, children, ...rest }: Props) => (
  <StyledPressable {...rest}>
    <Typography size={size} weight={weight} style={{ textAlign: 'center' }}>
      {children}
    </Typography>
  </StyledPressable>
)

export default TextButton
