import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number) {
    const cartItems = await this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    const products = cartItems.map((item) => item.productId);

    const order = await this.prisma.order.create({
      data: {
        userId,
        products,
        status: 'ordered',
      },
    });

    await this.prisma.cart.deleteMany({ where: { userId } });
    return order;
  }

  async findAll(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: {
        id: 'desc',
      },
    });
    const result = await Promise.all(
      orders.map(async (o) => {
        const products = await Promise.all(
          o.products.map(async (productId) => {
            return this.prisma.product.findUnique({
              where: { id: productId },
            });
          }),
        );
        const total = products.reduce((sum, p) => sum + (p?.price || 0), 0);
        return {
          ...o,
          products,
          total,
        };
      }),
    );

    return result;
  }
}
