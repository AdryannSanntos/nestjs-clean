import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayloadInfer } from 'src/infra/auth/jwt.strategy'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
export class CreateQuestionController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBody,
    @CurrentUser() user: UserPayloadInfer,
  ) {
    const { title, content } = body
    const userId = user.sub
    const slug = this.convertToSlug(title)

    const questionWithSameSlug = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (questionWithSameSlug) {
      throw new ConflictException('Question with same slug already exists.')
    }

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug: this.convertToSlug(title),
        authorId: userId,
      },
    })
  }

  private convertToSlug(str: string): string {
    return str
      .normalize('NFD') // Decomposes characters (e.g., é → e +  ́)
      .replace(/[\u0300-\u036f]/g, '') // Removes accents
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replaces spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // Removes non-alphanumeric characters (except hyphens);
  }
}
