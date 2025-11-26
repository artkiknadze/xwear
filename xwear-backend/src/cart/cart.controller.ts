import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':id')
  create(@Param('id') id: string, @Req() req: any) {
    console.log(req.id);
    return this.cartService.create(+id, req.user.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    console.log(req.user);
    return this.cartService.findAll(req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.cartService.remove(+id, req.user.userId);
  }
}
