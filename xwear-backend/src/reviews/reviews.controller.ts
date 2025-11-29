import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: any) {
    return this.reviewsService.create(createReviewDto, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') product_id: string) {
    return this.reviewsService.findAll(+product_id);
  }

  @Get('user-review/:productId')
  @UseGuards(AuthGuard('jwt'))
  findUsersReview(@Param('productId') product_id: string, @Req() req: any) {
    return this.reviewsService.findUsersReview(+product_id, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Req() req: any) {
    return this.reviewsService.update(+id, updateReviewDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
