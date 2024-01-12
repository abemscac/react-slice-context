import { pizzaDispatch, usePizzaContext } from '../contexts/pizza-context'
import { RenderCount } from './RenderCount'

export const PizzaPrice = () => {
  const pizzaPrice = usePizzaContext((state) => state.price)

  const { incrementPrice } = pizzaDispatch

  return (
    <div className="section">
      <RenderCount />
      <h2>Pizza price: ${pizzaPrice}</h2>
      <p>
        This component will only re-render when the <code>price</code> changes
        in <code>PizzaContext</code>.
      </p>
      <button onClick={incrementPrice}>Increment Price</button>
    </div>
  )
}
