import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from '../stripe/stripe.service';
import { PromocodesService } from '../promocodes/promocodes.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService,
        private readonly stripeService: StripeService,
        private readonly promocodesService: PromocodesService
    ) { }

    async create(userId: number, body: any) {
        const cartItems = await this.prisma.cart.findMany({
            where: { userId },
            include: { product: true, productSize: true },
        });

        const promocode = await this.promocodesService.validatePromocode(body.promoCode);

        const checkoutSession = body.paymentMethod === 'online' && await this.stripeService.createCheckoutSession(
            cartItems.map((item) => ({
                quantity: 1,
                price_data: {
                    currency: 'uah',
                    product_data: {
                        name: item.product.title,
                        description: item.productSize.size + ' розмір',
                    },
                    unit_amount: Math.round(item.productSize.price * (promocode.valid ? (1 - promocode.discount) : 1) * 100),
                },
            })),
            'http://localhost:3000/checkout/success',
            'http://localhost:3000/checkout/cancel',
        );

        const order = await this.prisma.order.create({
            data: {
                userId,
                status: checkoutSession ? 'ordered' : 'paid',
                firstName: body.firstName,
                lastName: body.lastName,
                phone: body.phone,
                country: body.country,
                region: body.region,
                house: body.house,
                company: body.company,
                city: body.city,
                street: body.street,
                zip: body.zip,
                promocodeId: promocode.valid ? promocode.id : null,
                stripeSessionId: checkoutSession?.id,
                total: Math.round(cartItems.reduce((sum, item) => sum + item.productSize.price * (promocode.valid ? (1 - promocode.discount) : 1), 0) * 100) / 100,
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

        await this.prisma.cart.deleteMany({ where: { userId } });
        return { ...order, checkoutUrl: checkoutSession?.url || '/checkout/success' };
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

        return orders;
    }
}
