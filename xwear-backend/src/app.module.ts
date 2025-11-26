import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CartService } from './cart/cart.service';
import { OrderService } from './order/order.service';
import { WishlistService } from './wishlist/wishlist.service';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ProductsModule, PrismaModule, UsersModule, CartModule, WishlistModule, OrderModule, AuthModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService, CartService, OrderService, WishlistService],
})
export class AppModule {}
