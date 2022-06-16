import { InMemorySearchableRepository } from '../../../@seedwork/domain/repository/in-memory-repository'
import CategoryRepository from '../../../category/repository/category.repository'

import Category from 'category/domain/entities/category'


class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository {
    sortableFields: string[] = [
      'name',
      'description',
      'created_at'
    ]

  protected async applyFilter(items: Category[], filter: string | null): Promise<Category[]> {
    if(!filter) {
      return items
    }
    
    return items.filter(entity => {
      return (
        entity.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        entity.props?.description?.toString().toLowerCase() === filter
      )
    })
  }

}

export default CategoryInMemoryRepository