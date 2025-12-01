import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { StripeModule } from '../stripe/stripe.module';
import { PromocodesModule } from '../promocodes/promocodes.module';

@Module({
  imports: [StripeModule, PromocodesModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
