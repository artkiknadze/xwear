import { Controller, Get, Param, Req } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Req() req: any) {
    return this.productsService.findAll({
        category: req.query.category,
        collection: req.query.collection,
        model: req.query.model,
        color: req.query.color,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }
}
