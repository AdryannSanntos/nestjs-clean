import { Controller, Get, Query } from '@nestjs/common'
import { createPaginator } from 'prisma-pagination'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const querySchema = z.object({
  page: z.coerce.number().optional().default(1).pipe(z.number().min(1)),
  perPage: z.coerce.number().optional().default(20).pipe(z.number().min(1)),
})

type FetchRecentQuestionQuery = z.infer<typeof querySchema>
const queryValidationPipe = new ZodValidationPipe(querySchema)

@Controller('/questions')
export class FetchRecentQuestionController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async handle(@Query(queryValidationPipe) query: FetchRecentQuestionQuery) {
    const { page, perPage } = query
    const paginate = createPaginator({ perPage, page })

    const questions = await paginate(this.prisma.question, {
      orderBy: {
        createdAt: 'desc',
      },
    })

    return questions
  }
}
