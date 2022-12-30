import { Pressable, View } from 'react-native'
import styled from 'styled-components/native'

export const ContainerHeader = styled(View)`
  padding: ${(props) => props.theme.sizes.extraLarge}px 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: ${(props) => props.theme.colours.white};
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 100, 0.1);
`

export const AddTodoButton = styled(Pressable)`
  border-radius: ${(props) => props.theme.sizes.big * 9000}px;
  justify-content: center;
  padding: 14px 16px;
  background-color: ${(props) => props.theme.colours.secondary};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`
