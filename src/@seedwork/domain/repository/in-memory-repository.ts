import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import RepositoryInterface, { SearchableRepisitoryInterface, SearchParams, SearchResult, SortDirection } from './repository-interface';

abstract class InMemoryRepository<T extends Entity> implements RepositoryInterface<T> {
  protected items: T[] = []

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
    await this._get(`${entity.id}`)
    const indexFound = this.items.findIndex(item => item.id === entity.id)
    this.items[indexFound] = entity
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const item = await this._get(`${id}`)
    const indexFound = this.items.findIndex(i => `${i.id}` === `${item.id}`)
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

abstract class InMemorySearchableRepository<
  E extends Entity
> extends InMemoryRepository<E>
  implements SearchableRepisitoryInterface<E> {
    sortableFields: string[] = [];

    async search(props: SearchParams): Promise<SearchResult<E>> {
      const itemsFiltred = await this.applyFilter(this.items, props.filter)
      
      const itemsSorted = await this.applySort(itemsFiltred, props.sort, props.sort_dir)
      const itemsPaginated = await this.applyPagination(itemsSorted, props.page, props.per_page)

      return new SearchResult({
        items: itemsPaginated,
        total: itemsFiltred.length,
        current_page: props.page,
        per_page: props.per_page,
        sort: props.sort,
        sort_dir: props.sort_dir,
        filter: props.filter
      })
    }

    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>

    protected async applySort(
      items: E[],
      sort?: string | null,
      sort_dir?: SortDirection | null
    ): Promise<E[]> {
      if (!(sort && this.sortableFields.includes(sort))) {
        return items
      }

      return [...items].sort((a, b) => {
        if(a.props[sort] < b.props[sort]) {
          return sort_dir === "asc" ? -1 : 1
        }

        if(a.props[sort] > b.props[sort]) {
          return sort_dir === "asc" ? 1 : -1
        }

        return 0
      })
    }

    protected async applyPagination(
      items: E[],
      page: SearchParams['page'], 
      per_page: SearchParams['per_page']
    ): Promise<E[]> {
      const start = (page-1) * per_page
      const limit = start + per_page
      return items.slice(start, limit)
    }
  }

export { InMemoryRepository, InMemorySearchableRepository }