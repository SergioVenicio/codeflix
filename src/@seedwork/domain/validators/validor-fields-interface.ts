type FieldsErrors = {
  [field: string]: string[]
}

interface ValidationFieldsInterface {
  errors: FieldsErrors | null
  validatedData: any
  validate(data: any): boolean
}

export { FieldsErrors }
export default ValidationFieldsInterface