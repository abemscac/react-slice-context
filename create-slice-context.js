"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSliceContext = void 0;
const create_internal_context_1 = require("./helpers/create-internal-context");
const create_use_context_hook_1 = require("./helpers/create-use-context-hook");
const createSliceContext = (options) => {
    const { state: stateInit, dispatch: dispatchInit } = options;
    const internalContext = (0, create_internal_context_1.createInternalContext)(stateInit, dispatchInit);
    const useContextHook = (0, create_use_context_hook_1.createUseContextHook)(internalContext);
    const useContext = (selector) => {
        return useContextHook(selector);
    };
    return {
        useContext,
        dispatch: internalContext.dispatch,
        getState: internalContext.getReadonlyState,
    };
};
exports.createSliceContext = createSliceContext;
