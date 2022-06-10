declare global {
  declare namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (received: FieldsErrors) => R
    }
  }
}

export {}