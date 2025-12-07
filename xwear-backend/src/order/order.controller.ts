  import { Body, Controller, Get, Post, RawBodyRequest, Req, UseGuards } from '@nestjs/common';
  import { OrderService } from './order.service';
  import { AuthGuard } from '@nestjs/passport';
  import { StripeService } from '../stripe/stripe.service';

  @Controller('order')
  export class OrderController {
    constructor(private readonly orderService: OrderService, private readonly stripeService: StripeService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createOrder(@Req() req: any, @Body() body: any) {
      return this.orderService.create(req.user.userId, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Req() req: any) {
      return this.orderService.findAll(req.user.userId);
    }

    @Post('stripe-webhook')
    async handleStripeWebhook(@Req() req: RawBodyRequest<Request>) {
      const sigHeader = req.headers['stripe-signature'];
      const event = await this.stripeService.verifyWebhookSignature(req.rawBody, sigHeader);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await this.stripeService.getCheckoutSession(session.id);
      }

      return { received: true };
    }
  }
