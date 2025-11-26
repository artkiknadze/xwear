import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':id')
  create(@Param('id') id: string, @Req() req: any) {
    return this.wishlistService.create(+id, req.user.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.wishlistService.findAll(req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.wishlistService.remove(+id, req.user.userId);
  }
}
