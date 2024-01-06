import { FormEvent, useRef } from 'react'
import { useTodoContext } from '../contexts/todo-context'
import { RenderCount } from './RenderCount'

export const TodoDispatch = () => {
  const { addTask, clear } = useTodoContext((_, dispatch) => dispatch)

  const input = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (input.current) {
      const { value } = input.current
      if (value) {
        addTask(input.current.value)
        input.current.value = ''
      }
    }
  }

  return (
    <div className="section">
      <RenderCount />
      <h2>Todo Dispatch</h2>
      <p>
        This component will not re-render, regardless of changes in the{' '}
        <code>TodoContext</code>, because it doesn't subscribe to any state from{' '}
        <code>TodoContext</code>.
      </p>
      <p>
        However, it will still re-render whenever its parent re-renders due to
        React's standard behavior.
      </p>
      <form onSubmit={onSubmit}>
        <input ref={input} placeholder="Task Name" />
        <button type="submit">Add Task</button>
      </form>
      <button className="clear-tasks-button" onClick={clear}>
        Clear Tasks
      </button>
    </div>
  )
}
