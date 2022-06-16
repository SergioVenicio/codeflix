import Category from '../../category/domain/entities/category'
import {
  SearchableRepisitoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchProps
} from '../../@seedwork/domain/repository/repository-interface'
import { throws } from 'assert';


namespace CategoryRepository {
  export type CategoryFilter = string;

  export class SearchParams extends DefaultSearchParams<CategoryFilter> {
    constructor(props: SearchProps<CategoryFilter>) {
      super(props)
      this.sort = props.sort ?? 'created_at'
      this.sort_dir = props.sort_dir ?? 'asc'
    }
    
  }
  export class SearchResult extends DefaultSearchResult<Category> {}

  export interface Repository
    extends SearchableRepisitoryInterface<Category, CategoryFilter, SearchParams, SearchResult> {}
}

export default CategoryRepository