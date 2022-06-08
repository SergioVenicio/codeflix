import { validate } from "uuid"

import Category from "./category"

import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id.vo"

describe('category test suit', () => {
  it('test contruct category', () => {
    const category = new Category({
      name: 'Movie',
      description: 'description',
      isActive: true,
      created_at: new Date()
    })

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
      expect(validate(category.id)).toBe(true)
    })
  })

  it('test construct with default description', () => {
    const category = new Category({
      name: 'Movie'
    })
    expect(category.description).toBe('')
    expect(category.created_at).toBeInstanceOf(Date)
    expect(category.isActive).toBe(true)
  })
})