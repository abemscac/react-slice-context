import { ITask, todoDispatch, useTodoContext } from '../contexts/todo-context'
import { RenderCount } from './RenderCount'

export const TodoTasks = () => {
  const tasks = useTodoContext((state) => state.tasks)

  const { toggleDone, removeTask } = todoDispatch

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
        <code>tasks</code> within <code>TodoContext</code>.
      </p>
      {tasks.length > 0 && <p>(Click on task name to toggle status)</p>}
      {tasks.length ? (
        <ol>{tasks.map(renderTask)}</ol>
      ) : (
        <div className="no-tasks">No Tasks</div>
      )}
    </div>
  )
}
