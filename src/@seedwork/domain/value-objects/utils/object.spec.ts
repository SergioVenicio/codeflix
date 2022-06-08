import { deepFreeze } from "./object"

describe('object utils unit tests', () => {
  it('should be able to free objects', () => {
    let newObject = deepFreeze({'a': 1, 'b': 2})
    expect(() => {
      (newObject as any)['b'] = 3
    }).toThrowError(TypeError)
    expect(newObject).toStrictEqual({'a': 1, 'b': 2})

    newObject = deepFreeze({'a': 1, 'b': 2, 'c': {'a': 1}})
    expect(() => {
      (newObject as any)['c']['a'] = 3
    }).toThrowError(TypeError)
    expect(newObject).toStrictEqual({'a': 1, 'b': 2, 'c': {'a': 1}})
  })

  it('should deep freeze return valid objects', () => {
    const date = new Date()
    expect(deepFreeze(date)).toBe(date)
    expect(deepFreeze('test')).toBe('test')
    expect(deepFreeze(5)).toBe(5)
  })
})