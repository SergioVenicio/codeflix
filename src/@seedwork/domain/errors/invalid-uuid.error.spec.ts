import InvalidUuidError from './invalid-uuid.error'

describe('invalid uuid error test suit', () => {
  it('test error default message and name', () => {
    const error = new InvalidUuidError()
    expect(error.message).toBe('ID must be a valid UUID')
    expect(error.name).toBe('InvalidUuidError')
  })

  it('test error with a custom message', () => {
    const error = new InvalidUuidError('Test')
    expect(error.message).toBe('Test')
  })
})