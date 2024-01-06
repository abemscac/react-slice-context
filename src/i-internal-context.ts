import { IDispatch } from './i-dispatch'

export type IInternalContext<
  State extends object,
  Dispatch extends IDispatch,
> = {
  getState: () => State
  getReadonlyState: () => State
  dispatch: Dispatch
  subscribe: (callback: OnSetCallback) => UnsubscribeFn
}

export type OnSetCallback = () => void

export type UnsubscribeFn = () => void
