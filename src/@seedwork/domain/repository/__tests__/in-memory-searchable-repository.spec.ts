import Entity from '../../../../@seedwork/domain/entity/entity'
import { InMemorySearchableRepository } from '../in-memory-repository'
import { SearchParams, SearchProps, SearchResult } from '../repository-interface'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorSearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
    if(!filter) {
      return items
    }

    return items.filter(entity => {
      return (
        entity.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        entity.props.price.toString().toLowerCase() === filter
      )
    })
  }

}

describe('Searchable repository tests', () => {
  let repository: StubInMemorSearchableRepository

  beforeEach(() => {
    repository = new StubInMemorSearchableRepository()
  })

  describe('filter tests', () => {
    it('should not call apply filter with a empty filter', async () => {
      const items = [
        new StubEntity({
          name: 'mouse',
          price: 69.99
        }),
        new StubEntity({
          name: 'keyboard',
          price: 250
        })
      ]

      const filterMock = jest.spyOn(Array.prototype, 'filter' as any)
      const itemsFiltred = await repository['applyFilter'](items, null)
      expect(itemsFiltred.length).toBe(2)
      expect(filterMock).not.toHaveBeenCalled()
    })

    it('should be able to apply filter', async () => {
      const items = [
        new StubEntity({
          name: 'mouse',
          price: 69.99
        }),
        new StubEntity({
          name: 'special mouse',
          price: 109.99
        }),
        new StubEntity({
          name: 'keyboard',
          price: 250
        }),
        new StubEntity({
          name: 'special keyboard',
          price: 500
        })
      ]

      const filterMock = jest.spyOn(items, 'filter' as any)
      const itemsFiltred = await repository['applyFilter'](items, 'keyboard')
      expect(itemsFiltred.length).toBe(2)
      expect(filterMock).toBeCalledTimes(1)
    })

    it('should return all items when a empty filter is used', async () => {
      repository.insert(new StubEntity({
        name: 'keyboard',
        price: 59.99
      }))
      repository.insert(new StubEntity({
        name: 'mouse',
        price: 69.99
      }))

      expect(
        (await repository.findAll()).length
      ).toBe(2)
      expect(
        (await repository.search(new SearchParams({}))).items.length
      ).toBe(2)
    })

    it('should be able to filter items by a string field', async () => { 
      // repository.insert(new StubEntity({
      //   name: 'keyboard',
      //   price: 259.99
      // }))
      // repository.insert(new StubEntity({
      //   name: 'mouse',
      //   price: 69.99
      // }))

      // expect(
      //   (await
      //       repository.search(new SearchParams({filter: 'keyboard'}))).items.length
      // ).toBe(1)
      // expect(
      //   (await
      //     repository.search(new SearchParams({filter: 'mouse'}))).items.length
      //   ).toBe(1)
      // expect(
      //   (await
      //     repository.search(new SearchParams({filter: 'invalid product'}))).items.length
      //   ).toBe(0)
      
      const items = [
        new StubEntity({
          name: 'a_test',
          price: 1
        }),
        new StubEntity({
          name: 'a_invalid',
          price: 1
        }),
        new StubEntity({
          name: 'c_test',
          price: 1
        }),
        new StubEntity({
          name: 'b_test',
          price: 1
        })
      ]
      repository['items'] = Array(...items)

      let test_items = Array(...items)
      test_items.splice(1, 1)

      const arrange = [
        {
          params: new SearchParams({
            filter: 'test'
          }),
          result: new SearchResult({
            items: test_items,
            total: 3,
            current_page: 1,
            per_page: 15,
            sort: null,
            sort_dir: null,
            filter: 'test'
          })
        },
        {
          params: new SearchParams({
            filter: 'test',
            per_page: 1
          }),
          result: new SearchResult({
            items: [items[0]],
            total: 3,
            current_page: 1,
            per_page: 1,
            sort: null,
            sort_dir: null,
            filter: 'test'
          })
        },
        {
          params: new SearchParams({
            filter: 'test',
            per_page: 1,
            sort: 'name',
            sort_dir: 'desc'
          }),
          result: new SearchResult({
            items: [items[2]],
            total: 3,
            current_page: 1,
            per_page: 1,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'test'
          })
        },
        {
          params: new SearchParams({
            filter: 'invalid'
          }),
          result: new SearchResult({
            items: [...items.splice(1, 1)],
            total: 1,
            current_page: 1,
            per_page: 15,
            sort: null,
            sort_dir: null,
            filter: 'invalid'
          })
        }
      ]
      
      for(const i of arrange) {
        const result = await repository.search(i.params)
        expect(result).toStrictEqual(i.result)
      }
    })

    it('should be able to filter items by a number value', async () => {
      repository.insert(new StubEntity({
        name: 'keyboard',
        price: 259.90
      }))
      repository.insert(new StubEntity({
        name: 'mouse',
        price: 69.99
      }))

      expect(
        (await
          repository.search(new SearchParams({filter: 259.90 as any}))).items.length
        ).toBe(1)
      expect(
        (await
          repository.search(new SearchParams({filter: 69.99 as any}))).items.length
        ).toBe(1)
      expect(
        (await
          repository.search(new SearchParams({filter: 169.99 as any}))).items.length
        ).toBe(0)
    })
  })

  describe('sort tests', () => {
    it('should not sort items', async () => {
      const items = [
        new StubEntity({
          name: 'b_test',
          price: 1
        }),
        new StubEntity({
          name: 'a_test',
          price: 1
        }),
        new StubEntity({
          name: 'c_test',
          price: 1
        })
      ]

      const sortMock = jest.spyOn(Array.prototype, 'sort' as any)
      const sortedItems = await repository['applySort'](items)

      expect(sortMock).not.toBeCalled()
      expect(sortedItems[0].props.name).toBe('b_test')
      expect(sortedItems[1].props.name).toBe('a_test')
      expect(sortedItems[2].props.name).toBe('c_test')
    })

    it('should be able to sort items using asc order', async () => {
      const items = [
        new StubEntity({
          name: 'b_test',
          price: 1
        }),
        new StubEntity({
          name: 'a_test',
          price: 1
        }),
        new StubEntity({
          name: 'c_test',
          price: 1
        })
      ]

      const sortMock = jest.spyOn(Array.prototype, 'sort' as any)
      let sortedItems = await repository['applySort'](items, 'name', 'asc')
      expect(sortMock).toBeCalled()
      expect(sortedItems[0].props.name).toBe('a_test')
      expect(sortedItems[1].props.name).toBe('b_test')
      expect(sortedItems[2].props.name).toBe('c_test')

      sortedItems = await repository['applySort'](items, 'name', 'desc')
      expect(sortMock).toBeCalled()
      expect(sortedItems[0].props.name).toBe('c_test')
      expect(sortedItems[1].props.name).toBe('b_test')
      expect(sortedItems[2].props.name).toBe('a_test')
    })
  })

  describe('test pagination', () => {
    it('should be able to apply pagination', async() => {
      const items = [
        new StubEntity({
          name: 'b_test',
          price: 1
        }),
        new StubEntity({
          name: 'a_test',
          price: 1
        }),
        new StubEntity({
          name: 'c_test',
          price: 1
        })
      ]
  
      let paginatedItems = await repository['applyPagination'](items, 1, 1)
      expect(paginatedItems.length).toBe(1)
      expect(paginatedItems[0].props.name).toBe('b_test')

      paginatedItems = await repository['applyPagination'](items, 2, 1)
      expect(paginatedItems.length).toBe(1)
      expect(paginatedItems[0].props.name).toBe('a_test')

      paginatedItems = await repository['applyPagination'](items, 3, 1)
      expect(paginatedItems.length).toBe(1)
      expect(paginatedItems[0].props.name).toBe('c_test')

      paginatedItems = await repository['applyPagination'](items, 4, 1)
      expect(paginatedItems.length).toBe(0)

      paginatedItems = await repository['applyPagination'](items, 1, 2)
      expect(paginatedItems.length).toBe(2)
      expect(paginatedItems[0].props.name).toBe('b_test')
      expect(paginatedItems[1].props.name).toBe('a_test')


      paginatedItems = await repository['applyPagination'](items, 1, 15)
      expect(paginatedItems.length).toBe(3)
      expect(paginatedItems[0].props.name).toBe('b_test')
      expect(paginatedItems[1].props.name).toBe('a_test')
      expect(paginatedItems[2].props.name).toBe('c_test')
    })
  })
})