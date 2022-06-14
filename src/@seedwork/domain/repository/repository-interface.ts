import Entity from '../entity/entity'
import UniqueEntityId from '../value-objects/unique-entity-id.vo'

interface RepositoryInterface<T extends Entity> {
  insert(entity: T): Promise<void>
  findById(id: string | UniqueEntityId): Promise<T>
  findAll(): Promise<T[]>
  update(entity: T): Promise<void>
  delete(id: string | UniqueEntityId): Promise<void>
}

type SortDirection = 'asc' | 'desc'

type SearchProps<Filter = string> = {
  page?: number,
  per_page?: number,
  sort?: string,
  sort_dir?: SortDirection,
  filter?: Filter
}

class SearchParams {
  protected _page: number = 1
  protected _per_page: number = 15
  protected _sort: string | null = null
  protected _sort_dir: SortDirection | null = null
  protected _filter: string | null = null

  constructor(props: SearchProps) {
    this.page = props.page ?? 1
    this.per_page = props.per_page ?? 50
    this.sort = props.sort ?? null
    this.sort_dir = props.sort_dir ?? 'asc'
  }

  get page(): number {
    return this._page
  }

  private set page(value: number) {
    let page = +value

    if(Number.isNaN(page) || page <= 0) {
      page = 1
    }

    this._page = parseInt(page as any)
  }

  get per_page(): number {
    return Number(this._per_page)
  }

  set per_page(value: number) {
    let per_page = +value

    if(Number.isNaN(per_page) || per_page <= 0) {
      per_page = 1
    }

    this._per_page = parseInt(per_page as any)
  }

  get sort(): string | null {
    return this._sort
  }

  private set sort(value: string | null) {
    this._sort = (
      value === null || value === undefined || value === ""
    ) ? null : `${value}`
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir
  }

  private set sort_dir(value: SortDirection | null) {
    if(!this.sort) {
      this.sort_dir = null
      return
    }

    const dir = String(value).toLowerCase()
    this._sort_dir = dir !==  'asc' &&  dir !== 'desc' ? 'asc': dir
  }

  get filter(): string | null {
    return this._filter
  }

  private set filter(value: string | null) {
    this._filter = (
      value === null || value === undefined || value === ""
    ) ? null : `${value}`
  }
}

class SearchResult {

}

interface SearchableRepisitoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>
}

export {
  SearchableRepisitoryInterface,
  SearchParams,
  SearchResult,
  SearchProps,
  SortDirection
}
export default RepositoryInterface