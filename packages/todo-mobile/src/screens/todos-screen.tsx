import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import Button from '../components/atoms/Button/Button'
import Layout from '../components/atoms/Layout/Layout'
import data from '../utils/data.json'
import { TodoCard } from '../components'

export const StyledScrollView = styled(FlatList)`
  flex: 1;
  height: 100px;
`
export const Divider = styled(View)`
  height: ${(props) => props.theme.sizes.large}px;
`

export const ContainerHeader = styled(View)`
  padding: ${(props) => props.theme.sizes.extraLarge}px 0px;
  justify-content: space-between;
`

export default function TodosScreen() {
  const _renderItem = useCallback(({ item }: any) => <TodoCard {...item} />, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#24f28b21',
      }}
    >
      <StatusBar style="auto" />

      <Layout>
        <ContainerHeader>
          <Text>List of TODO&apos;s</Text>
        </ContainerHeader>
        <StyledScrollView
          data={data.todos}
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
