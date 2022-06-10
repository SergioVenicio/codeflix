import { validateSync } from "class-validator";
import ValidationFieldsInterface, { FieldsErrors } from "./validor-fields-interface";

abstract class ValidatorFields<PropsValidated> implements ValidationFieldsInterface {
  public errors: FieldsErrors | null = null
  public validatedData: PropsValidated | null = null

  validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}

      for (const error of errors) {
        const field = error.property
        const messages = Object.values(error.constraints as {[key: string]: string})
        this.errors[field] = messages
      }

      return false
    }

    this.validatedData = data
    return true
  }
}

export default ValidatorFields