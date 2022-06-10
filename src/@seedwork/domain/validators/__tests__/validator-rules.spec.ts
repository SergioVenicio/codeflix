import { ValidationError } from "../../errors/validation-error"
import ValidatorRules from "../validator-rules"

describe('validator-rules test suit', () => {
  test('values method', () => {
    const rules = ValidatorRules.values('test', 'test')
    expect(rules).toBeInstanceOf(ValidatorRules)
    expect(rules['value']).toBe('test')
    expect(rules['property']).toBe('test')
  })

  it('should be able to validate a required field', () => {
    expect(() => {
      ValidatorRules.values('value', 'test').required()
    }).not.toThrow()
    expect(() => {
      ValidatorRules.values('', 'test').required()
    }).toThrowError(ValidationError)
  })

  it('should be able to validate if a value is a string', () => {
    expect(() => {
      ValidatorRules.values('value', 'test').string()
    }).not.toThrow()
    expect(() => {
      ValidatorRules.values(1, 'test').string()
    }).toThrowError(ValidationError)
  })

  it('should be able to validate if a value is a boolean', () => {
    expect(() => {
      ValidatorRules.values(true, 'test').boolean()
    }).not.toThrow()
    expect(() => {
      ValidatorRules.values('true', 'test').boolean()
    }).toThrowError(ValidationError)
  })

  it('should be able to validate a string maxLength', () => {
    expect(() => {
      ValidatorRules.values('value', 'test').maxLength(10)
    }).not.toThrow()
    expect(() => {
      ValidatorRules.values('value', 'test').maxLength(2)
    }).toThrow('The test must to be less or equal then 2 characters!')
  })

  it('should be able to use validators together', () => {
    expect(() => {
      ValidatorRules.values('value', 'test').required().string().maxLength(10)
    }).not.toThrow()

    expect(() => {
      ValidatorRules.values('value', 'test').string().required().maxLength(10)
    }).not.toThrow()

    expect(() => {
      ValidatorRules.values('value', 'test').maxLength(10).string().required()
    }).not.toThrow()
  })
})