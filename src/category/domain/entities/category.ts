import Entity from '../../../@seedwork/domain/entity/entity'
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo"


type CategoryProperties = {
  name: string,
  description?: string
  isActive?: boolean,
  created_at?: Date
  updated_at?: Date
}


class Category extends Entity<CategoryProperties> {
  constructor(
    props: CategoryProperties,
    id?: UniqueEntityId
  ) {
    super(props, id)

    this.isActive = props.isActive ?? true
    this.created_at = props.created_at ?? new Date()
    this.updated_at = props.updated_at
  }

  get description(): string {
    return String(this.props.description)
  }

  get name(): string {
    return this.props.name
  }

  set isActive(value: boolean) {
    this.props.isActive = value
  }
  
  get isActive(): boolean {
    return Boolean(this.props.isActive)
  }

  set created_at(value: Date) {
    this.props.created_at = value
  }

  get created_at(): Date {
    return this.props.created_at as Date
  }

  set updated_at(value: Date | undefined) {
    this.props.updated_at = value
  }

  get updated_at(): Date | undefined{
    return this.props.updated_at
  }

  public update(name: string, description: string) {
    this.props.name = name
    this.props.description = description
    this.updated_at = new Date()
  }

  public activate() {
    this.isActive = true
  }

  public deactivate() {
    this.isActive = false
  }
}

export default Category