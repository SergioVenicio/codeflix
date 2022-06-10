import { validate } from "uuid"

import Category from "./category"

import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo"

describe('category test suit', () => {

  beforeAll(() => {
    Category.validate = jest.fn()
  })

  it('test contruct category', () => {
    const category = new Category({
      name: 'Movie',
      description: 'description',
      isActive: true,
      created_at: new Date()
    })

    expect(Category.validate).toBeCalledTimes(1)
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('description')
    expect(category.isActive).toBe(true)
    expect(category.created_at).toBeInstanceOf(Date)
    expect(category.updated_at).toBeUndefined()
  })

  it('test id field is valid', () => {
    type CategoryData = {
      props: {
        name: string,
        description: string,
        isActive: boolean,
        created_at?: Date
      },
      id?: UniqueEntityId,
    }
    const propList: CategoryData[] = [
      {
        props: {
          name: 'Movie',
          description: 'description',
          isActive: true,
          created_at: new Date()
        }
      },
      {
        props: {
          name: 'Movie',
          description: 'description',
          isActive: true,
          created_at: new Date(),
        },
        id: undefined
      },
      {
        props: {
          name: 'Movie',
          description: 'description',
          isActive: true,
          created_at: new Date(),
        },
        id: new UniqueEntityId('788c7e35-880a-4d24-80ce-38f6b68498f2')
      }
    ]

    propList.forEach(props => {
      const category = new Category(props.props, props.id)
      expect(category.id).toBeDefined()
      expect(validate(category.id)).toBeTruthy()
    })
  })

  it('test construct with default description', () => {
    const category = new Category({
      name: 'Movie'
    })

    expect(Category.validate).toBeCalledTimes(1)
    expect(category.description).toBe('')
    expect(category.created_at).toBeInstanceOf(Date)
    expect(category.isActive).toBeTruthy
  })

  it('should be able to convert a category to json', () => {
    const category = new Category({
      name: 'Movie'
    })
    expect(category.toJson()).toMatchObject({
      name: 'Movie'
    })
  })

  it('should be able to update a existent category', () => {
    const category = new Category({
      name: 'Movie'
    })

    category.update('test name', 'test desc')
    expect(Category.validate).toBeCalledTimes(2)
    expect(category.name).toBe('test name')
    expect(category.description).toBe('test desc')
    expect(category.updated_at).toBeDefined()
  })

  it('should be able to active and deactive a category', () => {
    const category = new Category({
      name: 'Movie'
    })

    expect(Category.validate).toBeCalledTimes(1)

    category.activate()
    expect(category.isActive).toBeTruthy()

    category.deactivate()
    expect(category.isActive).toBeFalsy()
  })
})