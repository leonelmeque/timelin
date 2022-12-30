import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { Todo } from '../utils/types'

type Actions = 'ADD_TODO' | 'DELETE_TODO' | 'UPDATE_TODO' | 'GET_TODO'

type State = {
  todos: Todo[]
  completed: number
  notCompleted: number
}

type ReducerActions = {
  type: Actions
  payload: never
}

type ContextProps = {
  todosState: State
  dispatch: Dispatch<ReducerActions>
}

const initState: State = {
  todos: [],
  completed: 0,
  notCompleted: 0,
}

const Context = createContext<ContextProps>({
  todosState: initState,
  dispatch: () => null,
})

const reducer = (state: State, action: ReducerActions) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      }
    default:
      return state
  }
}

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const value: ContextProps = useMemo(
    () => ({ todosState: state, dispatch }),
    [state]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useTodoState = () => {
  const { todosState, dispatch } = useContext<ContextProps>(Context)
  return [todosState, dispatch]
}
