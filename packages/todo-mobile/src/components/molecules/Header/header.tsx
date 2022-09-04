import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import Typography from '../../atoms/Typography/typography'
import { AddTodoButton, ContainerHeader } from './styles'

const Header = () => {
  const currentTheme = useTheme()
  const navigation = useNavigation()

  const action = () => {
    navigation.navigate('AddTodo' as never)
  }
  return (
    <ContainerHeader>
      <Typography size="large" weight="bold" style={{ fontSize: 34 }}>
        List of TODO&apos;s
      </Typography>
      <AddTodoButton onPress={action}>
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
