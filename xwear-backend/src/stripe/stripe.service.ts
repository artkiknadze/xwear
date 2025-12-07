import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private readonly prisma: PrismaService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-11-17.clover',
        });
    }

    async createPaymentIntent(amount: number, currency: string, description: string) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method_types: ['card'],
        });
        return paymentIntent;
    }

    async createCheckoutSession(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], successUrl: string, cancelUrl: string) {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
        return session;
    }

    async getCheckoutSession(sessionId: string) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        await this.prisma.order.updateMany({
            where: { stripeSessionId: session.id },
            data: { status: 'paid' },
        });
        return session;
    }

    async verifyWebhookSignature(payload: Buffer, sigHeader: string) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        try {
            const event = this.stripe.webhooks.constructEvent(payload, sigHeader, webhookSecret);
            return event;
        } catch (err) {
            throw new Error(`Webhook signature verification failed: ${err.message}`);
        }
    }
}
