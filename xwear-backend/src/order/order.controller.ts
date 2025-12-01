import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Req() req: any, @Body() body: any) {
    return this.orderService.create(req.user.userId, body);
  }

  @Get()
  async findAll(@Req() req: any) {
    return this.orderService.findAll(req.user.userId);
  }
}
