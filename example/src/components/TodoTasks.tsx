import { useEffect } from 'react'
import { ITask, todoDispatch, useTodoContext } from '../contexts/todo-context'
import { Loading } from './Loading'
import { RenderCount } from './RenderCount'

export const TodoTasks = () => {
  const loading = useTodoContext((state) => state.loading)
  const tasks = useTodoContext((state) => state.tasks)

  const { loadTasks, toggleDone, removeTask } = todoDispatch

  useEffect(() => {
    loadTasks()
    // `loadTasks` remains constant, allowing it to be safely included in the `deps`
    // array of the `useEffect` hook for the ESLint rule (react-hooks/exhaustive-deps).
  }, [loadTasks])

  const renderTask = (task: ITask, index: number) => (
    <li key={task.name} className={task.done ? 'task-done' : undefined}>
      <span className="task-name" onClick={() => toggleDone(index)}>
        {task.name}
      </span>
      <button className="remove-task-button" onClick={() => removeTask(index)}>
        Remove
      </button>
    </li>
  )

  return (
    <div className="section">
      <RenderCount />
      <h2>Todo Tasks</h2>
      <p>
        This component will re-render whenever there are changes in the{' '}
        <code>tasks</code> within <code>TodoContext</code>.<br />
        The initial tasks are loaded asynchronously within a dispatch function.
      </p>
      {tasks.length > 0 && <p>(Click on task name to toggle status)</p>}
      {loading ? (
        <Loading />
      ) : tasks.length ? (
        <ol>{tasks.map(renderTask)}</ol>
      ) : (
        <div className="no-tasks">No Tasks</div>
      )}
    </div>
  )
}
