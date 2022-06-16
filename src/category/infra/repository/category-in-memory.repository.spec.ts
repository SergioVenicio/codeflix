import Category from "../../../category/domain/entities/category"
import CategoryRepository from "../../../category/repository/category.repository"
import CategoryInMemoryRepository from "./category-in-memory.repository"

describe('category in memory tests', () => {
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
  })

  it('should use created_at as default sort field', async () => {
    const items = [
      new Category({
        name: 'b_test',
        created_at: new Date('2100-01-01')
      }),
      new Category({
        name: 'a_test',
        created_at: new Date('2000-01-01')
      })
    ]

    repository['items'] = items

    let searchedItems = await repository.search(new CategoryRepository.SearchParams({}))
    expect(searchedItems.items[0].name).toBe(items[1].name)

    searchedItems = await repository.search(new CategoryRepository.SearchParams({
      sort_dir: 'desc'
    }))
    expect(searchedItems.items[0].name).toBe(items[0].name)

    searchedItems = await repository.search(new CategoryRepository.SearchParams({
      sort: 'name'
    }))
    expect(searchedItems.items[0].name).toBe(items[1].name)

    searchedItems = await repository.search(new CategoryRepository.SearchParams({
      sort: 'name',
      sort_dir: 'desc'
    }))
    expect(searchedItems.items[0].name).toBe(items[0].name)
  })

  it('should search items', async () => {
    const items = [
      new Category({
        name: 'b_test',
      }),
      new Category({
        name: 'a_test',
      })
    ]

    repository['items'] = items

    let searchedItems = await repository.search(new CategoryRepository.SearchParams({
      filter: 'b_'
    }))
    expect(searchedItems.items.length).toBe(1)
    expect(searchedItems.items[0].name).toBe(items[0].name)

    searchedItems = await repository.search(new CategoryRepository.SearchParams({
      filter: 'test'
    }))
    expect(searchedItems.items.length).toBe(2)
  })
})