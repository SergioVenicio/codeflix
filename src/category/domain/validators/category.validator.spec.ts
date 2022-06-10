import CategoryValidatorFactory, { CategoryValidator } from './category.validator'

let validator: CategoryValidator

describe('category validator tests suit', () => {
  beforeEach(() => {
    validator = CategoryValidatorFactory.create()
  })

  it('should be able to validate name', () => {
    expect(validator.validate({name: ''})).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      "name": ["name should not be empty"]
    })

    expect(validator.validate({name: 't'.repeat(3000)})).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      "name": ["name must be shorter than or equal to 250 characters"]
    })

    expect(validator.validate({name: 1})).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      "name": [
        "name must be a string",
        "name must be shorter than or equal to 250 characters"
      ]
    })
  })

  it('should be able to validate description', () => {
    expect(validator.validate({name: 'test', description: 1})).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      "description": ["description must be a string"]
    })
  })
})