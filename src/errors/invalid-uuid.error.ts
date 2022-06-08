class InvalidUuidError extends Error {
  constructor(msg?: string) {
    super(msg || 'ID must be a valid UUID')
    this.name = 'InvalidUuidError'
  }
}

export default InvalidUuidError