import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor() {
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
}
