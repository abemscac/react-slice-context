"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInternalContext = void 0;
const proxy_creators_1 = require("./proxy-creators");
const createInternalContext = (stateInit, dispatchInit) => {
    let hasChanged = false;
    const state = stateInit();
    /**
     * Mutable state that's used in dispatch functions.
     */
    const changeDetectionState = (0, proxy_creators_1.changeDetectionProxy)(state, () => {
        hasChanged = true;
    });
    /**
     * Read-only state that's exposed to the user.
     */
    const readonlyState = (0, proxy_creators_1.readonlyProxy)(state);
    /**
     * The callbacks to be triggered whenever a dispatch function is
     * executed and there is a change in any of the values after the
     * dispatch.
     */
    const listeners = new Set();
    const sourceDispatch = dispatchInit(changeDetectionState);
    /**
     * Creates a constant dispatcher and ensure it triggers listeners
     * whenever there is a change in any of the values after any
     * function within the dispatcher is executed.
     */
    const dispatch = Object.entries(sourceDispatch).reduce((result, [key, dispatchFn]) => {
        result[key] = (...args) => {
            dispatchFn(...args);
            if (hasChanged) {
                listeners.forEach((callback) => callback());
                hasChanged = false;
            }
        };
        return result;
    }, {});
    const subscribe = (callback) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
    };
    return {
        getState: () => state,
        getReadonlyState: () => readonlyState,
        dispatch: dispatch,
        subscribe,
    };
};
exports.createInternalContext = createInternalContext;
