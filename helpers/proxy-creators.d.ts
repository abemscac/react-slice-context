/**
 * Returns a proxy that triggers the `onChange` callback whenever a change occurs in the `set` trap.
 */
export declare const changeDetectionProxy: <T extends object>(obj: T, onChange: () => void) => T;
/**
 * Returns a readonly proxy of the given object.
 */
export declare const readonlyProxy: <T extends object>(obj: T) => T;
