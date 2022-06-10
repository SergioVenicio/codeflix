import Entity from '../../../@seedwork/domain/entity/entity'
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'

import CategoryValidatorFactory from '../validators/category.validator'

import { EntityValidationError } from '../../../@seedwork/domain/errors/validation-error'
import { FieldsErrors } from '@seedwork/domain/validators/validor-fields-interface'


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

    this.props.description = props.description ?? ''

    this.isActive = props.isActive ?? true
    this.created_at = props.created_at ?? new Date()
    this.updated_at = props.updated_at

    Category.validate({
      name: this.props.name,
      description: this.props.description,
      isActive: this.props.isActive
    })
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

    Category.validate({
      name: this.props.name,
      description: this.props.description
    })

    this.updated_at = new Date()
  }

  public activate() {
    this.isActive = true
  }

  public deactivate() {
    this.isActive = false
  }

  // public static validate({name, description, isActive}: Omit<CategoryProperties, 'created_at' | 'updated_at'>) {
  //   ValidatorRules.values(name, 'name').required().string()
  //   ValidatorRules.values(description, 'description').string()
  //   ValidatorRules.values(isActive, 'isActive').boolean()
  // }

  public static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(props)
    if (isValid) {
      return
    }

    throw new EntityValidationError(validator.errors as FieldsErrors)
  }
}

export { CategoryProperties }
export default Category