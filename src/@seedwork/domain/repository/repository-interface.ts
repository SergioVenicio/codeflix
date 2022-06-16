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

class SearchParams<Filter = string> {
  protected _page: number = 1
  protected _per_page: number = 15
  protected _sort: string | null = null
  protected _sort_dir: SortDirection | null = null
  protected _filter: Filter | null = null

  constructor(props: SearchProps<Filter>) {
    this.page = props.page ?? 1
    this.per_page = props.per_page ?? 15
    this.sort = props.sort ?? null
    this.sort_dir = props.sort_dir ?? 'asc'
    this.filter = props.filter ?? null
  }

  get page(): number {
    return this._page
  }

  protected set page(value: number) {
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
    if(typeof value === "boolean") {
      this._per_page == 15
      return
    }

    let per_page = +value
    if(Number.isNaN(per_page) || per_page <= 0) {
      this._per_page = 15
      return
    }

    this._per_page = parseInt(per_page as any)
  }

  get sort(): string | null {
    return this._sort
  }

  protected set sort(value: string | null) {
    this._sort = (
      value === null || value === undefined || value === ""
    ) ? null : `${value}`
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir
  }

  protected set sort_dir(value: SortDirection | null) {
    if(!this.sort) {
      this._sort_dir = null
      return
    }

    const dir = String(value).toLowerCase()
    this._sort_dir = dir !==  'asc' &&  dir !== 'desc' ? 'asc': dir
  }

  get filter(): Filter | null {
    return this._filter
  }

  protected set filter(value: Filter | null) {
    this._filter = (
      value === null || value === undefined || String(value) === ""
    ) ? null : `${value}` as any
  }
}

type SearchResultProps<E extends Entity, Filter> = {
  items: E[]
  total: number
  current_page: number
  per_page: number
  sort: string | null
  sort_dir: string | null
  filter: Filter | null
}
class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly current_page: number
  readonly per_page: number
  readonly last_page: number
  readonly sort: string | null
  readonly sort_dir: string | null
  readonly filter: Filter | null

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.current_page = props.current_page
    this.per_page = props.per_page
    this.sort = props.sort
    this.sort_dir = props.sort_dir
    this.filter = props.filter

    this.last_page = Math.ceil(this.total / this.per_page)
  }

  toJSON() {
    return  {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
      last_page: this.last_page
    }
  }
}

interface SearchableRepisitoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  sortableFields: string[]
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