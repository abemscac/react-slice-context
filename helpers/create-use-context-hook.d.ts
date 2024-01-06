import { IDispatch } from '../i-dispatch';
import { IInternalContext } from '../i-internal-context';
import { IUseContext } from '../i-slice-context';
export declare const createUseContextHook: <State extends object, Dispatch extends IDispatch, T>(internalContext: IInternalContext<State, Dispatch>) => IUseContext<State, T>;
