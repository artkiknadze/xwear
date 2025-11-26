import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(id: number, user_id: number) {
        await this.prisma.cart.create({
            data: {
                userId: user_id,
                productId: id,
                productSizeId: 1,
            },
        });
        return await this.findAll(user_id);
    }

    async findAll(user_id: number) {
        return {
            cart: await this.prisma.cart.findMany({
                where: {
                    userId: user_id,
                },
                include: {
                    product: true,
                },
            }),
            total:
                (
                    await this.prisma.product.aggregate({
                        _sum: {
                            price: true,
                        },
                        where: {
                            Cart: {
                                some: {
                                    userId: user_id,
                                },
                            },
                        },
                    })
                )._sum.price || 0,
        };
    }

    async remove(id: number, user_id: number) {
        await this.prisma.cart.delete({
            where: {
                id: id,
                userId: user_id,
            },
        });
        return await this.findAll(user_id);
    }
}
