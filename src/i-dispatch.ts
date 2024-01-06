export type IDispatch = Record<string, IDispatchFn>

export type IDispatchFn = (...args: any[]) => any
