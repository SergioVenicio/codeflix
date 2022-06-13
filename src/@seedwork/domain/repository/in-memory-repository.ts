import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import RepositoryInterface from './repository-interface';

abstract class InMemoryRepository<T extends Entity> implements RepositoryInterface<T> {
  private items: T[] = []

  async insert(entity: T): Promise<void> {
    this.items.push(entity)
  }

  async findById(id: string | UniqueEntityId): Promise<T> {
    return this._get(`${id}`)
  }
  
  async findAll(): Promise<T[]> {
    return [...this.items]
  }

  async update(entity: T): Promise<void> {
    const indexFound = this.items.findIndex(item => item.id === entity.id)
    this.items[indexFound] = entity
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const item = await this._get(`${id}`)
    const indexFound = this.items.findIndex(i => i.id === item.id)
    this.items.splice(indexFound, 1)
  }

  protected async _get(id: string): Promise<T> {
    const foundItem = this.items.find(
      item => item.id === id
    )

    if (!(foundItem)) {
      throw new NotFoundError(`Entity Not Found!`)
    }

    return foundItem
  }
}

export default InMemoryRepository