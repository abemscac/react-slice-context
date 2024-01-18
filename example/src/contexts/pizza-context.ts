import { createSliceContext } from '../../../src'

export type IPizzaState = {
  price: number
  flavor: string
}

const FLAVOR_KEY = 'pizzaFlavor'

export const { useContext: usePizzaContext, dispatch: pizzaDispatch } =
  createSliceContext({
    state: (): IPizzaState => {
      const storedFlavor = localStorage.getItem(FLAVOR_KEY)
      return {
        price: 10,
        flavor: storedFlavor || 'Pepperoni',
      }
    },
    dispatch: (pizza) => ({
      incrementPrice: () => {
        pizza.price++
      },
      setFlavor: (flavor: string) => {
        pizza.flavor = flavor
      },
    }),
    plugins: [
      {
        onChange: (state) => {
          localStorage.setItem(FLAVOR_KEY, state.flavor)
        },
      },
    ],
  })
