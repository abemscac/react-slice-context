import { IDispatch } from './i-dispatch'

export type ISliceContext<State extends object, Dispatch extends IDispatch> = {
  /**
   * Returns a read-only proxy of the state by default if `selector` is not provided.
   */
  useContext: <T = State>(selector?: ISelector<State, Dispatch, T>) => T
  /**
   * Return a read-only proxy of the state. This is useful for getting context value
   * outside component.
   */
  getState: () => State
  dispatch: Dispatch
}

export type IUseContext<State extends object, Dispatch extends IDispatch, T> = (
  selector?: ISelector<State, Dispatch, T>
) => T

export type ISelector<State extends object, Dispatch extends IDispatch, T> = (
  /**
   * This is a read-only proxy of the state.
   */
  state: State,
  dspatch: Dispatch
) => T
