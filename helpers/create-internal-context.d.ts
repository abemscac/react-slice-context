import { IDispatch } from '../i-dispatch';
import { IInternalContext } from '../i-internal-context';
export declare const createInternalContext: <State extends object, Dispatch extends IDispatch>(stateInit: () => State, dispatchInit: (state: State) => Dispatch) => IInternalContext<State, Dispatch>;
