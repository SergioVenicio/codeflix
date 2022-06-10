import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import ValidatorFields from "../../../@seedwork/domain/validators/validator-fields";

import { CategoryProperties } from '../entities/category'

class CategoryRules {
  @MaxLength(250)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

  @IsDate()
  @IsOptional()
  created_at: Date

  @IsDate()
  @IsOptional()
  updated_at: Date

  constructor({name, description, isActive, created_at, updated_at}: CategoryProperties) {
    this.name = name
    this.description = description as string
    this.isActive = isActive as boolean
    this.created_at = created_at as Date
    this.updated_at = updated_at as Date
  }
}

class CategoryValidator extends ValidatorFields<CategoryRules> {
  constructor() {
    super()
    this.errors = null
    this.validatedData = null
  }
  validate(data: CategoryProperties): boolean {
    return super.validate(new CategoryRules(data))
  }
}

class CategoryValidatorFactory {
  static create(): CategoryValidator {
    return new CategoryValidator()
  }
}

export { CategoryRules, CategoryValidator }
export default CategoryValidatorFactory