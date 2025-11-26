import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: number, user_id: number) {
    await this.prisma.wishlist.create({
      data: {
        userId: user_id,
        productId: id,
      },
    });
    return await this.findAll(user_id);
  }

  async findAll(user_id: number) {
    return {
      wishlist: await this.prisma.wishlist.findMany({
        where: {
          userId: user_id,
        },
        include: {
          product: true,
        },
      }),
    };
  }

  async remove(id: number, user_id: number) {
    await this.prisma.wishlist.delete({
      where: {
        id: id,
        userId: user_id,
      },
    });
    return await this.findAll(user_id);
  }
}
