import UniqueEntityId from "../value-objects/unique-entity-id.vo"

abstract class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId

  constructor(private readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId()
  }

  get id(): string {
    return String(this.uniqueEntityId.value)
  }

  toJson(): Required<{id: string} & Props>{
    return {
      id: this.id,
      ...this.props
    } as Required<{id: string} & Props>
  }
}

export default Entity