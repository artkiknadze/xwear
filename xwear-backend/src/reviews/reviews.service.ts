import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createReviewDto: CreateReviewDto, user_id: number) {
    await this.prisma.review.create({
      data: {
        userId: user_id,
        productId: createReviewDto.productId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
      },
    });
    return await this.findAll(createReviewDto.productId);
  }

  async findAll(product_id: number) {
    return await this.prisma.review.findMany({
      where: { productId: product_id },
      include: { user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        }
      } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
