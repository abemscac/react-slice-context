import { IDispatch, IDispatchFn } from '../i-dispatch'
import {
  IInternalContext,
  OnSetCallback,
  UnsubscribeFn,
} from '../i-internal-context'
import { ICreateSliceContextOptions } from '../i-slice-context'
import { changeDetectionProxy, readonlyProxy } from './proxy-creators'

export const createInternalContext = <
  State extends object,
  Dispatch extends IDispatch,
>(
  options: ICreateSliceContextOptions<State, Dispatch>
): IInternalContext<State, Dispatch> => {
  const { state: stateInit, dispatch: dispatchInit, plugins } = options

  /**
   * The callbacks to be triggered whenever a dispatch function is
   * executed and there is a change in the context state after the
   * dispatch.
   */
  const listeners = new Set<OnSetCallback>()

  let hasChanged = false

  const state = stateInit()

  /**
   * Mutable state that's used in dispatch functions.
   */
  const changeDetectionState = changeDetectionProxy(state, () => {
    hasChanged = true
  })

  const notifyChange = (): void => {
    // Triggers listeners to re-render components.
    listeners.forEach((callback) => callback())

    // Runs the `onChange` hook for all plugins.
    plugins?.forEach((plugin) => {
      plugin.onChange?.(readonlyState)
    })
  }

  const asyncChangeDetectionState = changeDetectionProxy(state, notifyChange)

  /**
   * Read-only state that's exposed to the user.
   */
  const readonlyState = readonlyProxy(state)

  // Runs the `onStateInit` hook for all plugins.
  plugins?.forEach((plugin) => {
    plugin.onStateInit?.(readonlyState)
  })

  const syncDispatch = dispatchInit(changeDetectionState)
  const asyncDispatch = dispatchInit(asyncChangeDetectionState)

  /**
   * Creates a constant dispatcher and ensure it triggers listeners
   * whenever there's a change in the context state after any dispatch
   * is fired.
   */
  const dispatch = Object.entries(syncDispatch).reduce(
    (result, [key, syncDispatchFn]) => {
      const isAsync =
        typeof syncDispatchFn === 'function' &&
        syncDispatchFn.constructor.name === 'AsyncFunction'

      let dispatchFn: IDispatchFn

      if (isAsync) {
        dispatchFn = asyncDispatch[key]
      } else {
        dispatchFn = syncDispatchFn
      }

      result[key] = async (...args: any[]): Promise<any> => {
        await dispatchFn(...args)
        // The change of async dispatch function is already notified
        // in the change detection proxy.
        if (!isAsync && hasChanged) {
          notifyChange()
        }
        hasChanged = false
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
