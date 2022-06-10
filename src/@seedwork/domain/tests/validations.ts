import { EntityValidationError } from '../errors/validation-error'
import ValidationFieldsInterface, { FieldsErrors } from '../validators/validor-fields-interface'

type Expected = {
  validator: ValidationFieldsInterface
  data: any
} | (() => any)

function callFunctionThrows(expected: Function, received: FieldsErrors) {
  try {
    expected()
    return {
      pass: false,
      message: () => 'The data is valid'
    }
  } catch (e) {
    const error = e as EntityValidationError
    const isMatch = expect.objectContaining(received).asymmetricMatch(error)
    return isMatch
        ? {pass: true, message: () => ''}
        : {
          pass: false,
          message: () => {
            return `The validations throws ${JSON.stringify(error.error)}. expected ${JSON.stringify(received)}.`
          }
        }
  }
}

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected  === 'function') {
      return callFunctionThrows(expected, received)
    }

    const { validator, data } = expected
    const isValid = validator.validate(data)
    if (isValid) {
      return {
        pass: false,
        message: () => 'The data is valid'
      }
    }

    const isMatch = expect.objectContaining(received).asymmetricMatch(validator.errors)
    return isMatch
            ? {pass: true, message: () => ''}
            : {
              pass: false,
              message: () => {
                return `The validations errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(validator.errors)}`
              }
            }
  }
})