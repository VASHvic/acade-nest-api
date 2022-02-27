import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<any> {
    const generatedId = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }
  @Get()
  async getAllProducts() {
    const products = await this.productService.getProducts();
    return products;
  }
  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    const product = await this.productService.getSingleProduct(prodId);
    return product;
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}
