import { createInternalContext } from './helpers/create-internal-context'
import { createUseContextHook } from './helpers/create-use-context-hook'
import { IDispatch } from './i-dispatch'
import {
  ICreateSliceContextOptions,
  ISelector,
  ISliceContext,
} from './i-slice-context'

export const createSliceContext = <
  State extends object,
  Dispatch extends IDispatch = IDispatch,
>(
  options: ICreateSliceContextOptions<State, Dispatch>
): ISliceContext<State, Dispatch> => {
  const internalContext = createInternalContext(options)

  const useContextHook = createUseContextHook<State, Dispatch, any>(
    internalContext
  )

  const useContext = <T>(selector?: ISelector<State, T>) => {
    return useContextHook(selector)
  }

  return {
    useContext,
    dispatch: internalContext.dispatch,
    getState: internalContext.getReadonlyState,
  }
}
