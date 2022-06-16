import { SearchParams, SearchResult } from '../repository-interface'

describe('SearchParams unit tests', () => {
  test('page prop', () => {
    const testParams = [
      {params: {}, expected: 1},
      {params: {page: 0}, expected: 1},
      {params: {page: null}, expected: 1},
      {params: {page: undefined}, expected: 1},
      {params: {page: 1}, expected: 1},
      {params: {page: 2}, expected: 2},
    ]

    testParams.forEach(item => {
      const params = new SearchParams({ page: item.params.page as  any})
      expect(params.page).toBe(item.expected)
    });
  })

  test('per_page prop', () => {
    const testParams = [
      {params: {}, expected: 15},
      {params: {per_page: 0}, expected: 15},
      {params: {per_page: null}, expected: 15},
      {params: {per_page: undefined}, expected: 15},
      {params: {per_page: -1}, expected: 15},
      {params: {per_page: true}, expected: 15},
      {params: {per_page: false}, expected: 15},
      {params: {per_page: 1}, expected: 1},
      {params: {per_page: 2}, expected: 2},
      {params: {per_page: 2.1}, expected: 2},
    ]

    testParams.forEach(item => {
      const params = new SearchParams({ per_page: item.params.per_page as  any})
      expect(params.per_page).toBe(item.expected)
    });
  })

  test('sort prop', () => {
    const testParams = [
      {params: {}, expected: null},
      {params: {sort: 0}, expected: '0'},
      {params: {sort: null}, expected: null},
      {params: {sort: undefined}, expected: null},
      {params: {sort: -1}, expected: '-1'},
      {params: {sort: true}, expected: 'true'},
      {params: {sort: false}, expected: 'false'},
      {params: {sort: 'field'}, expected: 'field'},
    ]

    testParams.forEach(item => {
      const params = new SearchParams({ sort: item.params.sort as  any})
      expect(params.sort).toBe(item.expected)
    });
  })

  test('sort_dir prop', () => {
    const testParams = [
      {params: {}, expected: null},
      {params: {sort_dir: 'asc'}, expected: null},
      {params: {sort_dir: 'desc'}, expected: null},
      {params: {sort: 'field', sort_dir: 'asc'}, expected: 'asc'},
      {params: {sort: 'field', sort_dir: 'ASC'}, expected: 'asc'},
      {params: {sort: 'field', sort_dir: 'desc'}, expected: 'desc'},
      {params: {sort: 'field', sort_dir: 'DESC'}, expected: 'desc'},
      {params: {sort: 'field', sort_dir: 'field'}, expected: 'asc'},
    ]

    testParams.forEach(item => {
      const params = new SearchParams({
        sort: item.params.sort,
        sort_dir: item.params.sort_dir as  any
      })
      expect(params.sort_dir).toBe(item.expected)
    });
  })

  test('filter prop', () => {
    const testParams = [
      {params: {}, expected: null},
      {params: {filter: undefined}, expected: null},
      {params: {filter: 0}, expected: '0'},
      {params: {filter: null}, expected: null},
      {params: {filter: -1}, expected: '-1'},
      {params: {filter: true}, expected: 'true'},
      {params: {filter: false}, expected: 'false'},
      {params: {filter: 'value'}, expected: 'value'},
    ]

    testParams.forEach(item => {
      const params = new SearchParams({
        filter: item.params.filter as any
      })
      expect(params.filter).toBe(item.expected)
    });
  })
})

describe('SearchResult unit tests', () => {
  test('constructor props', () => {
    let result = new SearchResult<any, string>({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null
    })

    expect(result.items.length).toBe(2)
    expect(result.total).toBe(4)
    expect(result.current_page).toBe(1)
    expect(result.per_page).toBe(2)
    expect(result.last_page).toBe(2)
    expect(result.sort).toBeNull()
    expect(result.sort_dir).toBeNull()
    expect(result.filter).toBeNull()

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: null,
      sort_dir: null,
      filter: null
    })

    result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'test'
    })
    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'test'
    })
  })

  it('should set last_page = 1 when per_page field is greater than total', () => {
    const result = new SearchResult<any, string>({
      items: [] as any,
      total: 4,
      current_page: 1,
      per_page: 15,
      sort: null,
      sort_dir: null,
      filter: null
    })

    expect(result.last_page).toBe(1)
  })
})