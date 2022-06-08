import InvalidUuidError from "../../errors/invalid-uuid.error"
import { v4 as uuidv4, validate } from "uuid"


class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuidv4()
    this.validate()
  }

  toString(): string {
    return String(this.id)
  }

  validate() {
    const isValid = validate(String(this.id))
    if (!isValid) {
      throw new InvalidUuidError()
    }    
  }
}

export default UniqueEntityId