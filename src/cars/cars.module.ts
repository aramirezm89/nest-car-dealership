import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, BrandsService],
  exports: [CarsService],
})
export class CarsModule {}
