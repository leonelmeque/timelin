import { Todo } from './types'

const todosURL = 'http://localhost:3001/todos'

const headers = {
  'Content-Type': 'application/json',
}

const postTodos = async (payload: Todo) => {
  const resp = await fetch(`${todosURL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
  const data = await resp.json()

  return data
}

const getTodos = async () => {
  const resp = await fetch(todosURL)
  const data = await resp.json()

  return data
}

const updateTodo = async (id: string, payload: Todo) => {
  const resp = await fetch(`${todosURL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  const data = resp.json()

  return data
}

const deleteTodo = async (id: string) => {
  const resp = await fetch(`${todosURL}/${id}`)
  const data = await resp.json()

  return data
}

const todosAPI = {
  postTodos,
  getTodos,
  updateTodo,
  deleteTodo,
}

const userAPI = {}

export { todosAPI, userAPI }
