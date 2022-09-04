import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import Typography from '../../atoms/Typography/typography'
import { AddTodoButton, ContainerHeader } from './styles'

const Header = () => {
  const currentTheme = useTheme()

  return (
    <ContainerHeader>
      <Typography size="large" weight="bold" style={{ fontSize: 34 }}>
        List of TODO&apos;s
      </Typography>
      <AddTodoButton onPress={() => alert('hello')}>
        <FontAwesome
          name="plus"
          size={currentTheme.sizes.extraLarge}
          color={`${currentTheme.colours.white}`}
        />
      </AddTodoButton>
    </ContainerHeader>
  )
}

export default Header
