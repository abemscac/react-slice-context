import { usePizzaContext } from '../contexts/pizza-context'
import { RenderCount } from './RenderCount'

export const Pizza = () => {
  const pizza = usePizzaContext()

  return (
    <div className="section">
      <RenderCount />
      <h2>Pizza: {JSON.stringify(pizza)}</h2>
      <p>
        This component will re-render whenever there's a change in{' '}
        <code>PizzaContext</code>.
      </p>
    </div>
  )
}
