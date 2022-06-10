import UniqueEntityId from '../unique-entity-id.vo'
import InvalidUuidError from "../../errors/invalid-uuid.error"

describe('Unique entity id value object tests', () => {
  it('should call validate method', () => {
    const uuid = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const validateSpy = jest.spyOn(UniqueEntityId.prototype, 'validate')
    const id = new UniqueEntityId(uuid)

    expect(id.value).toBe(uuid)
    expect(validateSpy).toBeCalledTimes(1)
  })
  it('should create with a valid uuid', () => {
    expect(() => {
      return new UniqueEntityId('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
    }).not.toThrowError(InvalidUuidError)
  })
  it('should throw invalid uuid error with a invalid uuid', () => {
    expect(() => {
      return new UniqueEntityId('1')
    }).toThrowError(InvalidUuidError)
  })
})