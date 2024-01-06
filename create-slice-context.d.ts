import { IDispatch } from './i-dispatch';
import { ISliceContext } from './i-slice-context';
export type ICreateSliceContextOptions<State extends object, Dispatch extends IDispatch> = {
    state: () => State;
    dispatch: (state: State) => Dispatch;
};
export declare const createSliceContext: <State extends object, Dispatch extends IDispatch = IDispatch>(options: ICreateSliceContextOptions<State, Dispatch>) => ISliceContext<State, Dispatch>;
