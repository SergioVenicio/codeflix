import { v4 as uuidv4, validate } from "uuid"

import ValueObject from './value-object'

import InvalidUuidError from "../../../errors/invalid-uuid.error"


class UniqueEntityId extends ValueObject<string>{
  constructor(public readonly id?: string) {
    super(id || uuidv4())
    this.validate()
  }

  validate() {
    const isValid = validate(String(this._value))
    if (!isValid) {
      throw new InvalidUuidError()
    }    
  }
}

export default UniqueEntityId