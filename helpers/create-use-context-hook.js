"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseContextHook = void 0;
const react_1 = require("react");
const proxy_creators_1 = require("./proxy-creators");
const createUseContextHook = (internalContext) => {
    return (selector) => {
        const computeValue = () => {
            if (selector) {
                const readonlyState = internalContext.getReadonlyState();
                return selector(readonlyState);
            }
            else {
                const state = internalContext.getState();
                if (state !== undefined && state !== null) {
                    // Returns a new proxy of the state to make sure the
                    // component still re-renders when changes occur if
                    // `selector` is not provided.
                    return (0, proxy_creators_1.readonlyProxy)(state);
                }
                else {
                    return state;
                }
            }
        };
        const [value, setValue] = (0, react_1.useState)(computeValue);
        (0, react_1.useEffect)(() => {
            const unsubscribe = internalContext.subscribe(() => {
                setValue(computeValue);
            });
            return () => {
                unsubscribe();
            };
        }, []);
        return value;
    };
};
exports.createUseContextHook = createUseContextHook;
