"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readonlyProxy = exports.changeDetectionProxy = void 0;
/**
 * Returns a proxy that triggers the `onChange` callback whenever a change occurs in the `set` trap.
 */
const changeDetectionProxy = (obj, onChange) => {
    const handler = {
        get: (target, key) => {
            const value = target[key];
            if (typeof value === 'object' && value !== null) {
                return new Proxy(value, handler);
            }
            else {
                return value;
            }
        },
        set: (target, key, newValue, receiver) => {
            if (target[key] !== newValue) {
                onChange();
            }
            return Reflect.set(target, key, newValue, receiver);
        },
    };
    return new Proxy(obj, handler);
};
exports.changeDetectionProxy = changeDetectionProxy;
/**
 * Returns a readonly proxy of the given object.
 */
const readonlyProxy = (obj) => {
    const handler = {
        get: (target, key) => {
            const value = target[key];
            if (typeof value === 'object' && value !== null) {
                return new Proxy(value, handler);
            }
            else {
                return value;
            }
        },
        set: (_, key) => {
            console.warn(`Property '${key.toString()}' cannot be set because it's readonly`);
            return true;
        },
    };
    return new Proxy(obj, handler);
};
exports.readonlyProxy = readonlyProxy;
