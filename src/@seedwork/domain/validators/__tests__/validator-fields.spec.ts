import * as libClassValidator from 'class-validator'

import ValidatorFields from '../validator-fields'

class StubValidatorFields extends ValidatorFields<{'prop': string}> {}

describe('validator fields test suit', () => {
  it('should init error and data with null', () => {
    const validator = new StubValidatorFields()

    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toBeNull()
  })

  it('should init error and data with null', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      {property: 'field', constraints: {isRequired: 'some error'}}
    ])
    const validator = new StubValidatorFields()
    
    expect(validator.validate(null)).toBeFalsy()
    expect(libClassValidator.validateSync).toBeCalled()
    expect({validator, data: null}).containsErrorMessages({
      'field': ['some error']
    })
  })
})