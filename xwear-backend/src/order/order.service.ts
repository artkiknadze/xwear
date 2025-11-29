import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService, private readonly stripeService: StripeService) {
    }

    async create(userId: number) {
        const cartItems = await this.prisma.cart.findMany({
            where: { userId },
            include: { product: true, productSize: true },
        });

        const order = await this.prisma.order.create({
            data: {
                userId,
                status: 'ordered',
            },
        });

        await this.prisma.orderItem.createMany({
            data: cartItems.map((item) => ({
                orderId: order.id,
                productId: item.productId,
                productSizeId: item.productSizeId,
                quantity: 1,
                price: item.productSize.price,
            })),
        });

        console.log(cartItems[0].productSize.price);

        const checkoutSession = await this.stripeService.createCheckoutSession(
            cartItems.map((item) => ({
                quantity: 1,
                price_data: {
                    currency: 'uah',
                    product_data: {
                        name: item.product.title,
                        description: item.productSize.size + ' розмір',
                    },
                    unit_amount: Math.round(item.productSize.price * 100),
                },
            })),
            'http://localhost:3000/checkout/success',
            'http://localhost:3000/checkout/cancel',
        );

        console.log(checkoutSession)

        await this.prisma.cart.deleteMany({ where: { userId } });
        return { ...order, checkoutUrl: checkoutSession.url };
    }

    async findAll(userId: number) {
        const orders = await this.prisma.order.findMany({
            where: { userId },
            orderBy: {
                id: 'desc',
            },
            include: {
                items: {
                    include: {
                        product: true,
                        productSize: true,
                    }
                }
            }
        });

        const result = await Promise.all(orders.map(async (order) => {
            const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return {
                ...order,
                total,
            };
        }));

        return result;
        //     const result = await Promise.all(
        //         orders.map(async (o) => {
        //             const products = await Promise.all(
        //                 o.products.map(async (productId) => {
        //                     return this.prisma.product.findUnique({
        //                         where: {id: productId},
        //                     });
        //                 }),
        //             );
        //             const total = products.reduce((sum, p) => sum + (p?.price || 0), 0);
        //             return {
        //                 ...o,
        //                 products,
        //                 total,
        //             };
        //         }),
        //     );
        //
        //     return result;
    }
}
