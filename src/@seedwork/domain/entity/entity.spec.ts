import { validate } from 'uuid'
import UniqueEntityId from '../value-objects/unique-entity-id.vo'
import Entity from './entity'

class StubEntity extends Entity<{prop1: string, prop2: number}> {}

describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const uniqueId = new UniqueEntityId('788c7e35-880a-4d24-80ce-38f6b68498f2')
    const entity = new StubEntity(
      {prop1: 'prop1', prop2: 1},
      uniqueId
    )
    
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(validate(entity.id)).toBeTruthy()
    expect(entity.id).toBe(uniqueId.value)
  })

  it('should convert to json', () => {
    const uniqueId = new UniqueEntityId('788c7e35-880a-4d24-80ce-38f6b68498f2')
    const entity = new StubEntity(
      {prop1: 'prop1', prop2: 1},
      uniqueId
    )
    expect(entity.toJson()).toStrictEqual({
      id: "788c7e35-880a-4d24-80ce-38f6b68498f2",
      prop1: "prop1",
      prop2: 1
    })
  })
})