import { deepFreeze } from './utils/object'

abstract class ValueObject<T = any> {
  protected readonly _value: T

  constructor(value: T) {
    this._value = deepFreeze<T>(value) as Readonly<T>
  }

  get value(): T {
    return this._value
  }

  toString = () => {
    if (typeof this._value === 'object') {
      return JSON.stringify(this._value)
    }

    return String(this._value)
  }
}

export default ValueObject