import { IDispatch, IDispatchFn } from '../i-dispatch'
import {
  IInternalContext,
  OnSetCallback,
  UnsubscribeFn,
} from '../i-internal-context'
import { changeDetectionProxy, readonlyProxy } from './proxy-creators'

export const createInternalContext = <
  State extends object,
  Dispatch extends IDispatch,
>(
  stateInit: () => State,
  dispatchInit: (state: State) => Dispatch
): IInternalContext<State, Dispatch> => {
  let hasChanged = false

  const state = stateInit()

  /**
   * Mutable state that's used in dispatch functions.
   */
  const changeDetectionState = changeDetectionProxy(state, () => {
    hasChanged = true
  })
  /**
   * Read-only state that's exposed to the user.
   */
  const readonlyState = readonlyProxy(state)

  /**
   * The callbacks to be triggered whenever a dispatch function is
   * executed and there is a change in any of the values after the
   * dispatch.
   */
  const listeners = new Set<OnSetCallback>()

  const sourceDispatch = dispatchInit(changeDetectionState)

  const dispatch = Object.entries(sourceDispatch).reduce(
    (result, [key, dispatchFn]) => {
      result[key] = (...args: any[]): any => {
        dispatchFn(...args)
        if (hasChanged) {
          listeners.forEach((callback) => callback())
          hasChanged = false
        }
      }
      return result
    },
    {} as Record<string, IDispatchFn>
  )

  const subscribe = (callback: OnSetCallback): UnsubscribeFn => {
    listeners.add(callback)
    return () => listeners.delete(callback)
  }

  return {
    getState: () => state,
    getReadonlyState: () => readonlyState,
    dispatch: dispatch as Dispatch,
    subscribe,
  }
}
