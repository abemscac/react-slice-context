import { createSliceContext } from '../../../src'

export type IPizzaState = {
  price: number
  flavor: string
}

export const { useContext: usePizzaContext, dispatch: pizzaDispatch } =
  createSliceContext({
    state: (): IPizzaState => ({
      price: 10,
      flavor: 'Pepperoni',
    }),
    dispatch: (pizza) => ({
      incrementPrice: () => {
        pizza.price++
      },
      setFlavor: (flavor: string) => {
        pizza.flavor = flavor
      },
    }),
  })
