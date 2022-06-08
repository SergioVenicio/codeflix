import UniqueEntityId from '../../../@seedwork/domain/unique-entity-id.vo'


type CategoryProperties = {
  name: string,
  description?: string
  isActive?: boolean,
  created_at?: Date
  updated_at?: Date
}


class Category {
  private _id: UniqueEntityId
  private _name: string
  private _description: string
  private _isActive: boolean
  private _created_at: Date
  private _updated_at: Date | undefined

  constructor(
    props: CategoryProperties,
    id?: UniqueEntityId
  ) {
    this._id = id || new UniqueEntityId()
    this._name = props.name
    this._description = props.description ?? ''
    this._isActive = props.isActive ?? true
    this._created_at = props.created_at ?? new Date()
    this._updated_at = props.updated_at
  }

  get id(): string {
    return this._id.toString()
  }

  get description(): string {
    return String(this._description)
  }

  get name(): string {
    return this._name
  }
  
  get isActive(): boolean {
    return Boolean(this._isActive)
  }

  get created_at(): Date {
    return new Date(this._created_at)
  }

  get updated_at(): Date | undefined {
    return this._updated_at ? new Date(this._updated_at): undefined
  }
}

export default Category