import { FormEvent, useRef } from 'react'
import { pizzaDispatch, usePizzaContext } from '../contexts/pizza-context'
import { RenderCount } from './RenderCount'

export const PizzaFlavor = () => {
  const flavor = usePizzaContext((state) => state.flavor)

  const { setFlavor } = pizzaDispatch

  const input = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()
    const { value } = input.current ?? {}
    if (value !== undefined) {
      setFlavor(value)
    }
  }

  return (
    <div className="section">
      <RenderCount />
      <h2>Pizza flavor: {flavor}</h2>
      <p>
        This component will only re-render when the <code>flavor</code> changes
        in <code>PizzaContext</code>.
      </p>
      <p>
        Additionally, there's a plugin within the <code>PizzaContext</code> that
        automatically saves the pizza flavor to the <code>localStorage</code>{' '}
        whenever there's a change in <code>PizzaContext</code>.
        <br />
        This ensures that your pizza flavor can be restored upon refreshing the
        page.
      </p>
      <form onSubmit={onSubmit}>
        <input ref={input} defaultValue={flavor} />
        <button type="submit">Set Flavor</button>
      </form>
    </div>
  )
}
