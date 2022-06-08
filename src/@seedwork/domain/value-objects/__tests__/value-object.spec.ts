import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}


describe('Value Object class tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('string value')
    expect(vo.value).toBe('string value')

    vo = new StubValueObject({
      prop1: 'value1'
    })
    expect(vo.value).toStrictEqual({
      prop1: 'value1'
    })
  })

  it('should convert to string', () => {
    const date = new Date()
    const testData = [
      {given: 'string value', expected: 'string value'},
      {given: {prop1: 'value1'}, expected: "{\"prop1\":\"value1\"}"},
      {given: date, expected: JSON.stringify(date)},
      {given: [0, "test", false], expected: "[0,\"test\",false]"},
    ]

    testData.forEach(({given, expected}) => {
      const vo = new StubValueObject(given)
      expect(`${vo}`).toBe(expected)
    })
  })

  it('should not change a value-object', () => {
    const vo = new StubValueObject(1)

    expect(() => {
      (vo as any).value = 5
    }).toThrowError(TypeError)
    expect(`${vo}`).toBe("1")
  })
})