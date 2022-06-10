import { FieldsErrors } from "../validators/validor-fields-interface";

class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

class EntityValidationError extends ValidationError {
  constructor(public error: FieldsErrors) {
    const message = Object.values(error || {}).map((values) => {
      return `${values.join(', ')}`
    }).join(', ')
    super(message)
    this.name = 'EntityValidationError'
  }
}

export { ValidationError, EntityValidationError }