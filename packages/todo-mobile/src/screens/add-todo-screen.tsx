import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StatusBar, TextInput as RNTextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Button, TextButton } from '../components'
import Layout from '../components/atoms/Layout/Layout'

export const TextInput = styled(RNTextInput)<{ isFocused?: boolean }>`
  border: 2px;
  border-color: ${(props) =>
    props.isFocused ? props.theme.colours.primary : props.theme.colours.white};
  padding: ${(props) => props.theme.sizes.large}px;
  border-radius: ${(props) => props.theme.sizes.small - 8}px;
  font-size: ${(props) => props.theme.typography.sizes.body}px;
  font-weight: bold;
  background-color: ${(props) => props.theme.colours.white};
`

export const TextAreaInput = styled(TextInput)`
  height: 160px;
`

const formInput = {
  todoName: '',
  description: '',
  color: '#c3c3c3',
}

const AddTodoScreen = () => {
  const [state, setState] = useState<typeof formInput>(formInput)

  const navigation = useNavigation()

  const handleInput = (name: string) => (text: string) => {
    setState({
      ...state,
      [name]: text,
    })
  }

  const saveTodo = () => {
    if (state.todoName === '') {
      alert('Your Todo is empty, please enter todo name')
      return
    }
    navigation.goBack()
  }

  const onCancel = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar auto />
      <Layout>
        <TextInput
          onChangeText={handleInput('todoName')}
          value={state.todoName}
          placeholder="Enter todo name"
        />
        <View style={{ height: 12 }} />
        <TextAreaInput
          onChangeText={handleInput('description')}
          value={state.description}
          placeholder="Description"
          multiline
          numberOfLines={4}
          maxLength={260}
        />
        <View style={{ flex: 1 }} />
        <Button
          label="Add todo"
          variant="primary"
          size="lg"
          onPress={saveTodo}
        />
        <TextButton size="body" weight="bold" onPress={onCancel}>
          Cancel
        </TextButton>
      </Layout>
    </SafeAreaView>
  )
}

export default AddTodoScreen
