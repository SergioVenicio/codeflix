import { ValidationError } from "../errors/validation-error"

class ValidatorRules {
  private constructor(
    private value: any,
    private property: string
  ) {}

  static values(value: any, property: string): ValidatorRules {
    return new ValidatorRules(value, property)
  }

  required(): this {
    if (this.value === null || this.value === undefined || this.value === '') {
      throw new ValidationError(`The ${this.property} is required!`)
    }
    return this
  }

  string(): this {
    if (!isEmpty(this.value) && typeof this.value !== 'string') {
      throw new ValidationError(`The ${this.property} must to be a string!`)
    }
    return this
  }

  boolean(): this {
    if (!isEmpty(this.value) && typeof this.value !== 'boolean') {
      throw new ValidationError(`The ${this.property} must to be a boolean!`)
    }
    return this
  }

  maxLength(max: number): this {
    ValidatorRules.values(this.value, this.property).string()

    if (this.value.length > max) {
      throw new ValidationError(`The ${this.property} must to be less or equal then ${max} characters!`)
    }
    return this
  }
}

function isEmpty(value: any) {
  return value == undefined || value == null
}

export default ValidatorRules