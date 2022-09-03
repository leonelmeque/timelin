import { TouchableOpacity } from 'react-native'
import { Todo } from '../../../utils/types'
import {
  TodoCardContainer,
  TodoCreatingDate,
  TodoName,
  TodoStatus,
} from './styles'

const TodoCard = ({ color, todo, timestamp, isComplete }: Todo) => (
  <TouchableOpacity>
    <TodoCardContainer cardColor={color}>
      <TodoName>{todo}</TodoName>
      <TodoCreatingDate>Creation date: {timestamp}</TodoCreatingDate>
      <TodoStatus>Status: {isComplete ? 'Done' : 'Not Done'}</TodoStatus>
    </TodoCardContainer>
  </TouchableOpacity>
)

export default TodoCard
