import './App.css'
import { Button, Input } from '@todo/ui/platform-web'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">
      <TodoList todos={[]} />
      <Button
        type="button"
        aria-pressed="true"
        label="Button"
        variant="primary"
        size="lg"
        onClick={() => alert('I am a button')}
      />

      <Input />
    </div>
  )
}

export default App
