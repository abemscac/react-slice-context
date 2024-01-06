import { MockInstance, beforeEach, describe, expect, it, vitest } from 'vitest'
import {
  changeDetectionProxy,
  readonlyProxy,
} from '../../src/helpers/proxy-creators'

type ISource = {
  id: number
  name: string
  fruits: {
    name: string
    price: number
  }[]
}

describe('Proxy Creators', () => {
  let source: ISource

  beforeEach(() => {
    source = {
      id: 1,
      name: 'user',
      fruits: [
        {
          name: 'apple',
          price: 100,
        },
      ],
    }
  })

  describe('changeDetectionProxy()', () => {
    let callback: () => void
    let proxy: ISource

    beforeEach(() => {
      callback = vitest.fn()
      proxy = changeDetectionProxy(source, callback)
    })

    it('should not trigger the `onChange` callback when there are no changes', () => {
      proxy.id = source.id
      expect(callback).not.toBeCalled()

      proxy.name = source.name
      expect(callback).not.toBeCalled()

      proxy.fruits[0].name = source.fruits[0].name
      expect(callback).not.toBeCalled()

      proxy.fruits[0].price = source.fruits[0].price
      expect(callback).not.toBeCalled()
    })

    it('should trigger onChange callback whenever a change occurrs', () => {
      proxy.id++
      expect(callback).toBeCalledTimes(1)

      proxy.id = 999
      expect(callback).toBeCalledTimes(2)

      proxy.name = 'asd'
      expect(callback).toBeCalledTimes(3)

      proxy.fruits[0].name = 'banana'
      expect(callback).toBeCalledTimes(4)

      proxy.fruits[0].price--
      expect(callback).toBeCalledTimes(5)
    })
  })

  describe('readonlyProxy()', () => {
    let spyWarn: MockInstance<any[], void>
    let proxy: ISource

    beforeEach(() => {
      spyWarn = vitest.spyOn(console, 'warn').mockImplementation(() => {})
      proxy = readonlyProxy(source)
    })

    it('should display a warning message whenever the user attempts to set any value on the proxy', () => {
      proxy.id++
      expect(spyWarn).toBeCalledWith(
        "Property 'id' cannot be set because it's readonly"
      )

      proxy.id = source.id
      expect(spyWarn).toBeCalledWith(
        "Property 'id' cannot be set because it's readonly"
      )

      proxy.name = source.name
      expect(spyWarn).toBeCalledWith(
        "Property 'name' cannot be set because it's readonly"
      )

      proxy.fruits[0].price = 0
      expect(spyWarn).toBeCalledWith(
        "Property 'price' cannot be set because it's readonly"
      )

      proxy.fruits.push({
        name: 'banana',
        price: 200,
      })
      expect(spyWarn).toBeCalledWith(
        "Property 'length' cannot be set because it's readonly"
      )
    })

    it('should prevent any changes from being applied to the source object', () => {
      proxy.id++
      proxy.name = 'new name'
      proxy.fruits[0].name = 'banana'
      proxy.fruits[0].price = 999
      proxy.fruits.push({
        name: 'cherry',
        price: 567,
      })

      expect(source).toEqual({
        id: 1,
        name: 'user',
        fruits: [
          {
            name: 'apple',
            price: 100,
          },
        ],
      })
    })
  })
})
