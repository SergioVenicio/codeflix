import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

import ValidatorFields from '../validator-fields'


class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  constructor(name: any, price: any) {
    this.name = name
    this.price = price
  }
}

class StubValidatorFields extends ValidatorFields<StubRules> {
  constructor() {
    super()
    this.errors = null
    this.validatedData = null
  }
  
  validate({name, price}: {name: string, price: number}): boolean {
    return super.validate(new StubRules(name, price))
  }
}

describe('validator field integration tests', () => {
  it('should validate with errors', () => {
    const validator = new StubValidatorFields()
    validator.validate(new StubRules('', 50))
    expect({validator, data: new StubRules('', 50)}).containsErrorMessages({
      'name': ['name should not be empty']
    })

    validator.validate(new StubRules('test', null))
    expect({validator, data: new StubRules('test', null)}).containsErrorMessages({
      'price': [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ]
    })
  })

  it('should validate without errors', () => {
    const validator = new StubValidatorFields()
    validator.validate(new StubRules('test', 50))
    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toMatchObject({
      'name': 'test',
      'price': 50
    })
  })
})