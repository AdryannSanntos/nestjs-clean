import { UseCaseError } from 'src/core/errors/errors/use-case-error'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials are invalid.')
  }
}
