import { createId } from '@paralleldrive/cuid2'

export class UniqueEntityId {
  private value: string

  toString(): string {
    return this.value
  }

  toValue(): string {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? createId()
  }

  public equals(id: UniqueEntityId) {
    return id.toValue() === this.toValue()
  }
}
