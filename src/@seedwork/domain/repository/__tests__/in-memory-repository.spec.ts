import Entity from "../../entity/entity"
import NotFoundError from "../../errors/not-found.error"
import UniqueEntityId from "../../value-objects/unique-entity-id.vo"
import { InMemoryRepository } from "../in-memory-repository"

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('In memory repository tests', () => {
  let repository: StubInMemoryRepository

  beforeEach(() => {
    repository = new StubInMemoryRepository()
  })

  it('should be able to insert new entities', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 10.99
    })
    repository.insert(entity)

    expect(entity.toJson()).toMatchObject({
      name: 'test',
      price: 10.99
    })
    await expect((await repository.findAll()).length).toBe(1)
    expect(await repository.findById(entity.id)).toBe(entity)
  })

  it('should throws error when entity not found', async () => {
    expect(async() => 
      repository.findById('not_found_id')
    ).rejects.toThrowError(NotFoundError)
  })

  it('should be able to find by id', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 10.99
    })
    repository.insert(entity)
    const foundEntity = await repository.findById(entity.id)

    expect(foundEntity.toJson()).toStrictEqual(entity.toJson())
  })

  it('should be able to find all entities', async () => {
    repository.insert(new StubEntity({
      name: 'test',
      price: 10.99
    }))
    repository.insert(new StubEntity({
      name: 'test 2',
      price: 12.99
    }))

    const entities = await repository.findAll()
    expect(entities.length).toBe(2)
  })

  it('should be able to update a entity', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 10.99
    })
    repository.insert(entity)

    const updatedEntity = new StubEntity({
      name: 'update',
      price: 1.99,
    }, new UniqueEntityId(entity.id))
    await repository.update(updatedEntity)

    const items = await repository.findAll()
    expect(items[0].toJson()).toMatchObject({
      name: 'update',
      price: 1.99
    })
  })

  it('should throw error when try update a invalid entity', async () => {
    const updatedEntity = new StubEntity({
      name: 'update',
      price: 1.99,
    }, new UniqueEntityId('67ec3f64-eadf-494c-9c69-70a26299e132'))
    expect(repository.update(updatedEntity)).rejects.toThrowError(NotFoundError)
  })

  it('should throw error when try update a invalid entity', async () => {
    const updatedEntity = new StubEntity({
      name: 'update',
      price: 1.99,
    }, new UniqueEntityId('67ec3f64-eadf-494c-9c69-70a26299e132'))
    expect(
      repository.delete(updatedEntity.id)
    ).rejects.toThrowError(NotFoundError)
  })

  it('should be able to delete a entity', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 10.99
    })
    repository.insert(entity)
    expect((await repository.findAll()).length).toBe(1)

    await repository.delete(entity.id)
    expect((await repository.findAll()).length).toBe(0)
  })
})