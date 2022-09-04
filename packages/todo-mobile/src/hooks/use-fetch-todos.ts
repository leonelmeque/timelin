import { useEffect, useState } from 'react'
import { todosAPI } from '../utils/backend'
import { Todo } from '../utils/types'

const useFetchTodos = () => {
  const [state, setState] = useState<Todo[] | null>(null)

  useEffect(() => {
    todosAPI.getTodos().then((data) => {
      setState(data)
    })
  }, [])

  return state
}

export default useFetchTodos
