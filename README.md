# React Slice Context 🍕

![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-slice-context)
![npm](https://img.shields.io/npm/v/react-slice-context)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/abemscac/react-slice-context/main)

`react-slice-context` is a lightweight, performant, proxy-based state management library for React, built on the concept of slices and leveraging the power of React hooks. It provides a simple and flexible way to manage state in your React applications.

## Table of Contents

- [Demo and Example Projects](#demo-and-example-projects)
- [Requirements](#requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API](#api)
- [Optimization](#optimization)
- [Dispatch](#dispatch)
- [Update Context Value Outside of Components](#update-context-value-outside-of-components)
- [Get Context Value Outside of Components](#get-context-value-outside-of-components)
- [Common Mistakes](#common-mistakes)
- [Benchmark](#benchmark)

## Demo and Examples

- [Demo](https://abemscac.github.io/react-slice-context/)
- [Online Example](https://stackblitz.com/edit/react-slice-context-example)
- [Offline Example](https://github.com/abemscac/react-slice-context/tree/main/example)

## Requirements

To use this library, make sure your `react` and `react-dom` versions are both **16.8.4 or later**, as hooks were introduced in React 16.8.

## Installation

Install `react-slice-context` in your project using any package manager of your choice; for example:

```bash
npm install react-slice-context
```

## Getting Started

1. Import the `createSliceContext` function from `react-slice-context`:

   ```ts
   import { createSliceContext } from 'react-slice-context'
   ```

2. Create a slice context with an **initial state** and a **dispatcher**:

   ```ts
   import { createSliceContext } from 'react-slice-context'

   const pizzaContext = createSliceContext({
     state: () => {
       // Return your initial state here.
       return {
         price: 10,
         flavor: 'Pepperoni',
       }
     },
     dispatch: (pizza) => {
       // Define the functions to update the state of this slice context here.
       // You can mutate the state directly without any concerns!
       return {
         incrementPrice: () => {
           pizza.price++
         },
         setFlavor: (flavor: string) => {
           pizza.flavor = flavor
         },
       }
     },
   })
   ```

3. Export the `useContext` and `dispatch` from the slice context. It is recommended to use [destructing assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) syntax to rename them so that it's more convenient when you have multiple contexts.

   ```ts
   // Either export and rename them after declaration.
   const pizzaContext = createSliceContext({ ... })
   export const { useContext: usePizzaContext, dispatch: pizzaDispatch } = pizzaContext

   // ...or do it all at once.
   export const {
     useContext: usePizzaContext,
     dispatch: pizzaDispatch,
   } = createSliceContext({
     ...
   })
   ```

4. Use the exported `usePizzaContext` (formerly `useContext`) and `pizzaDispatch` (formerly `dispatch`) to access the state and dispatcher within your components:

   ```tsx
   import { usePizzaContext, pizzaDispatch } from './pizza-context'

   const MyComponent = () => {
     // This will cause the component to re-render whenever there's a change in `pizzaContext`.
     const pizza = usePizzaContext()

     const { incrementPrice } = pizzaDispatch

     return (
       <div>
         <h2>Pizza price: {pizza.price}</h2>
         <h2>Pizza flavor: {pizza.flavor}</h2>
         <button onClick={incrementPrice}>Increment Price</button>
       </div>
     )
   }
   ```

## API

1. `createSliceContext(options)`

   Creates a slice context with the specified options.

   ### Options

   | Property   | Type     | Required | Description                                                                                                                                                                                                                                                                    | Default Value |
   | ---------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
   | `state`    | function | ✅       | A function that returns the initial state for the slice context.                                                                                                                                                                                                               |               |
   | `dispatch` | function | ✅       | A function that returns the dispatcher (a set of dispatch functions) for the slice context. The functions declared in the dispatcher are **the only ones allowed to change the context state**. For more information, please refer to the [Dispatch](#dispatch) section below. |               |
   | `plugins`  | Array    |          | 🚧 Work in progress 🚧                                                                                                                                                                                                                                                         | `undefined`   |

   ### Return Value

   It returns a slice context with the following properties:

   | Property               | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `useContext(selector)` | function | `useContext(selector)` is a **hook** to retrieve the state of the associated context; it can only be used within the body of a React functional component. By default, when the optional `selector` argument is not provided, `useContext()` returns the entire state, which will cause the component to re-render whenever there's a change in the context. If your component only care about specific context properties, using something like `const state = useMyContext()` may not deliver optimal performance. Check out the [Optimization](#optimization) section below for further insights. |
   | `dispatch`             | object   | The dispatcher for the slice context. It works both inside and outside of components. See the [Dispatch](#dispatch) section below for more information.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
   | `getState()`           | function | Returns a read-only state in the slice context. This is useful for getting context state outside of components.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

## Optimization

By default, `useContext()` returns the entire state, which will cause the component to re-render whenever there's a change in the context. Consider the `pizzaContext` as shown below:

```ts
const { useContext: usePizzaContext } = createSliceContext({
  state: () => ({
    price: 10,
    flavor: 'Pepperoni',
  }),
})
```

In the following component, only the `price` from `pizzaContext` is relevant, but the change of `pizzaContext.flavor` will still cause this component to re-render:

```tsx
const MyComponent = () => {
  // Bad
  const pizza = usePizzaContext()

  // `pizza.flavor` is not being used anywhere in this component.
  // However, the change of `pizza.flavor` will still cause this
  // component to re-render!

  return <div>Pizza price: {pizza.price}</div>
}
```

To address this and optimize performance, we can utilize the optional `selector` argument in `useContext(selector)`. For example:

```ts
const MyComponent = () => {
  // Good!
  const pizzaPrice = usePizzaContext((state) => state.price)

  // `pizza.flavor` doesn't affect this component anymore.

  return <div>Pizza price: {pizza.price}</div>
}
```

Think of `useContext(selector)` as **`useState()` with built-in awareness of when to update itself**. The `selector` function receives the current context value and expects a return value. If the `price` in `pizzaContext` changes, the `pizzaPrice` here will update, leading to a re-render of this component.

Noted that `selector` executes **whenever there's a change in the context value**. This means if the return value of `selector` is a **new non-primitve value** (e.g., an object or array), the component will still re-render whenever there's a change in the context value, even if related values haven't changed. For example:

```tsx
// Context
const { useContext: usePizzaContext } = createSliceContext({
  state: () => ({
    price: 10,
    flavor: 'Pepperoni',
    frozen: true,
  }),
})

// Component
const MyComponent = () => {
  // Bad
  const priceAndFlavor = usePizzaContext((state) => ({
    price: state.price,
    flavor: state.flavor,
  }))

  // `pizza.frozen` is not being used anywhere in this component.
  // However, the change of `pizza.frozen` will still cause this
  // component to re-render!

  return <div>...</div>
}
```

To mitigate this, separate `priceAndFlavor` into two distinct `usePizzaContext(selector)` calls:

```tsx
// Context
const { useContext: usePizzaContext } = createSliceContext({
  state: () => ({
    price: 10,
    flavor: 'Pepperoni',
    frozen: true,
  }),
})

// Component
const MyComponent = () => {
  // Good!
  const price = usePizzaContext((state) => state.price)
  const flavor = usePizzaContext((state) => state.flavor)

  // `pizza.frozen` doesn't affect this component anymore.

  return <div>...</div>
}
```

This ensures that changes in `pizzaContext.frozen` do not cause unnecessary re-renders.

## Dispatch

The `dispatch` object returned by `createSliceContext(options)` is a set of dispatch functions. **Only the functions declared in the dispatcher are permitted to modify the context state.**

### State Is Read-Only

**The values returned by `useContext(selector)` and [`getState()`](#get-context-value-outside-of-components) are read-only**. Attempting to update the context value without using the corresponding dispatch functions will trigger a warning in the console, and **no changes will be applied** to the context. Trying to execute code similar to the following example will result in a warning:

```tsx
const MyComponent = () => {
  const pizza = usePizzaContext()

  const raisePrice = () => {
    // Invalid: this will generate a warning in the console,
    // and `pizza.price` will remain unchanged.
    pizza.price += 5
  }

  return <div>...</div>
}
```

## Update Context Value Outside of Components

To update context value outside of components, you can use the functions declared in the dispatcher, just as you would when updating the context value inside components. For example:

```ts
// Context
const { dispatch: authDispatch } = createSliceContext({
  state: () => ({
    token: undefined,
  }),
  dispatch: (auth) => {
    setToken: (token: string) => {
      auth.token = token
    }
  },
})

// In some other non-component files
import { authDispatch } from './auth-context'

authDispatch.setToken('...')
```

## Get Context Value Outside of Components

To get context value outside of components, you can simply utilize the `getState()` function provided by `createSliceContext(options)`. For example:

```ts
// Context
const { getState: getAuthState } = createSliceContext({
  state: () => ({
    token: undefined,
  }),
})

// In some other non-component files
import { getAuthState } from './auth-context'

axios.interceptors.request.use((request) => {
  const { token } = getAuthState()
  request.headers.Authorization = `Bearer ${token}`
})
```

It's important to note that the value returned by `getState()` is read-only. As mentioned earlier, only functions declared in the dispatcher are permitted to modify the context state.

## Common Mistakes

Please be aware that, due to the nature of JavaScript, [primitive types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) won't behave as expected when used with destructuring assignment or when assigned to another variable. For example:

```tsx
// Context
const { useContext: usePizzaContext } = createSliceContext({
  state: () => ({
    price: 10,
  }),
})

// Component
const MyComponent = () => {
  // Incorrect: `price` will not be reactive.
  const { price } = usePizzaContext()
  // Incorrect: `price` will not be reactive.
  const { price } = usePizzaContext((state) => state)
  // Incorrect: `price` will not be reactive.
  const price = usePizzaContext().price

  // Correct!
  const price = usePizzaContext((state) => state.price)

  return <div>...</div>
}
```

## Benchmark

🚧 Work in progress 🚧
