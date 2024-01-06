/**
 * Returns a proxy that triggers the `onChange` callback whenever a change occurs in the `set` trap.
 */
export const changeDetectionProxy = <T extends object>(
  obj: T,
  onChange: () => void
): T => {
  const handler: ProxyHandler<any> = {
    get: (target, key) => {
      const value = target[key]
      if (typeof value === 'object' && value !== null) {
        return new Proxy(value, handler)
      } else {
        return value
      }
    },
    set: (target, key, newValue, receiver) => {
      if (target[key] !== newValue) {
        onChange()
      }
      return Reflect.set(target, key, newValue, receiver)
    },
  }

  return new Proxy(obj, handler)
}

/**
 * Returns a readonly proxy of the given object.
 */
export const readonlyProxy = <T extends object>(obj: T): T => {
  const handler: ProxyHandler<any> = {
    get: (target, key) => {
      const value = target[key]
      if (typeof value === 'object' && value !== null) {
        return new Proxy(value, handler)
      } else {
        return value
      }
    },
    set: (_, key) => {
      console.warn(
        `Property '${key.toString()}' cannot be set because it's readonly`
      )
      return true
    },
  }
  return new Proxy(obj, handler)
}
