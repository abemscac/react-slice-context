import { Pizza } from './components/Pizza'
import { PizzaFlavor } from './components/PizzaFlavor'
import { PizzaPrice } from './components/PizzaPrice'
import { RenderCount } from './components/RenderCount'
import { TodoDispatch } from './components/TodoDispatch'
import { TodoTasks } from './components/TodoTasks'

export const App = () => {
  return (
    <div className="app section">
      <RenderCount />
      <h1>React Slice Context Demo 🍕</h1>
      <p>
        This component won't re-render unless you add some state to it and make
        changes.
      </p>
      <PizzaPrice />
      <PizzaFlavor />
      <Pizza />
      <TodoTasks />
      <TodoDispatch />
    </div>
  )
}
