import { RenderCount } from './components/RenderCount'
import { TodoDispatch } from './components/TodoDispatch'
import { TodoTasks } from './components/TodoTasks'
import { User } from './components/User'
import { UserId } from './components/UserId'
import { UserName } from './components/UserName'

export const App = () => {
  return (
    <div className="app section">
      <RenderCount />
      <h1>React Slice Context Demo</h1>
      <p>
        This component will not re-render unless you add some state to it and
        change them.
      </p>
      <UserId />
      <UserName />
      <User />
      <TodoTasks />
      <TodoDispatch />
    </div>
  )
}
