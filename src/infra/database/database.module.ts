import { UserRepository } from '@/domain/application/repositories/user.repository'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
