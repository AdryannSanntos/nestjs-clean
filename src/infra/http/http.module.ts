import { Module } from '@nestjs/common'
import { AuthenticateUserUseCase } from 'src/domain/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from 'src/domain/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-question.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    CreateQuestionController,
    FetchRecentQuestionController,
    AuthenticateController,
  ],
  providers: [AuthenticateUserUseCase, RegisterUserUseCase],
})
export class HttpModule {}
