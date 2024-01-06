import { IDispatch } from './i-dispatch'

export type ISliceContext<State extends object, Dispatch extends IDispatch> = {
  /**
   * Returns a read-only proxy of the state by default if `selector` is not provided.
   */
  useContext: <T = State>(selector?: ISelector<State, T>) => T
  dispatch: Dispatch
  /**
   * Returns a read-only proxy of the state. This is useful for getting context value
   * outside component.
   */
  getState: () => State
}

export type IUseContext<State extends object, T> = (
  selector?: ISelector<State, T>
) => T

export type ISelector<State extends object, T> = (
  /**
   * This is a read-only proxy of the state.
   */
  state: State
) => T
