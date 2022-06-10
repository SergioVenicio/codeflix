import { EntityValidationError } from '../../../@seedwork/domain/errors/validation-error'
import Category from './category'

describe('categoty end to end tests', () => {
  it('should be able to create a new category', () => {
    const category = new Category({
      name: 'test',
      description: 'test'
    })
    expect(category.name).toBe('test')
    expect(category.description).toBe('test')
  })

  it('should throw error with a invalid value', () => {
    type CategoryProperties = {
      name: string,
      description: any
    }
    const testValues = [
      {name:'', description: 'test'},
      {name: null, description: 'test'},
      {name: undefined, description: 'test'},
      {name: 'test', description: 5},
      {name: 'test', description: true},
    ]

    testValues.forEach(({name, description}) => {
      expect(() => {
        /* NOSONAR */ new Category({name, description} as CategoryProperties)
      }).toThrowError(EntityValidationError)
    })
  })

  it('should throw error with a invalid value on update', () => {
    type TestProperties = {
      name: any,
      description: any
      error: any
    }
    const testValues = [
      {
        name:'',
        description: 'test',
        error: 'name should not be empty'},
      {
        name: null,
        description: 'test',
        error: 'name should not be empty, name must be a string, name must be shorter than or equal to 250 characters'
      },
      {
        name: undefined,
        description: 'test',
        error: 'name should not be empty, name must be a string, name must be shorter than or equal to 250 characters'
      },
      {
        name: 'test',
        description: 5,
        error: 'description must be a string'
      },
      {
        name: 'test',
        description: true,
        error: 'description must be a string'
      },
    ]

    const category = new Category({name: 'test'})

    testValues.forEach(({name, description, error}: TestProperties) => {
      expect(() => {
        category.update(name, description)
      }).toThrowError(EntityValidationError)

      expect(() => {
        category.update(name, description)
      }).toThrow(error)
    })
  })
})