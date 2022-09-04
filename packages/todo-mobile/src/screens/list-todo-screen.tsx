import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/atoms/Button/Button'
import Layout from '../components/atoms/Layout/Layout'
import { Header, TodoCard } from '../components'
import useFetchTodos from '../hooks/use-fetch-todos'

export const StyledScrollView = styled(FlatList)`
  flex: 1;
  height: 100px;
  padding-top: 12px;
`
export const Divider = styled(View)`
  height: ${(props) => props.theme.sizes.large}px;
`

export default function TodosScreen() {
  const todos = useFetchTodos()
  const _renderItem = useCallback(({ item }: any) => <TodoCard {...item} />, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <StatusBar style="auto" />
      <Header />
      <Layout>
        <StyledScrollView
          data={todos}
          keyExtractor={(item: any) => item.id.toString()}
          ItemSeparatorComponent={Divider}
          renderItem={_renderItem}
        />
        <Button
          variant="primary"
          size="md"
          label="Add Todo"
          onPress={() => {
            alert('Hello world')
          }}
        />
      </Layout>
    </SafeAreaView>
  )
}
