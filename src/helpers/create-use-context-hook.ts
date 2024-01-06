import { useEffect, useState } from 'react'
import { IDispatch } from '../i-dispatch'
import { IInternalContext } from '../i-internal-context'
import { ISelector, IUseContext } from '../i-slice-context'
import { readonlyProxy } from './proxy-creators'

export const createUseContextHook = <
  State extends object,
  Dispatch extends IDispatch,
  T,
>(
  internalContext: IInternalContext<State, Dispatch>
): IUseContext<State, T> => {
  return (selector?: ISelector<State, T>) => {
    const computeValue = (): T => {
      if (selector) {
        const readonlyState = internalContext.getReadonlyState()
        return selector(readonlyState)
      } else {
        const state = internalContext.getState()
        if (state !== undefined && state !== null) {
          // Returns a new proxy of the state to make sure the
          // component still re-renders when changes occur if
          // `selector` is not provided.
          return readonlyProxy(state) as unknown as T
        } else {
          return state
        }
      }
    }

    const [value, setValue] = useState(computeValue)

    useEffect(() => {
      const unsubscribe = internalContext.subscribe(() => {
        setValue(computeValue)
      })

      return () => {
        unsubscribe()
      }
    }, [])

    return value
  }
}
