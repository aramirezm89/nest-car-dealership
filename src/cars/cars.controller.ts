import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import type { Car } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): { cars: Car[]; code: number } {
    return {
      cars: this.carsService.findAllCars(),
      code: 200,
    };
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): {
    car: Car;
    code: number;
  } {
    const car = this.carsService.findCarById(id);
    if (!car) {
      throw new NotFoundException(`Car with index ${id} not found`);
    }

    return {
      car,
      code: 200,
    };
  }

  @Post()
  createCar(@Body() body: Car): { car: Car; code: number } {
    const newCar = this.carsService.createCar(body);
    return {
      car: newCar,
      code: 201,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number): {
    code: number;
    cars: Car[];
  } {
    const car = this.carsService.findCarById(id);
    if (!car) {
      throw new NotFoundException(`Car with index ${id} not found`);
    }
    const cars = this.carsService.deleteCar(id);
    return {
      cars,
      code: 200,
    };
  }

  @Patch(':id')
  updateNameCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Car,
  ): { car: Car; code: number } {
    const car = this.carsService.findCarById(id);
    if (!car) {
      throw new NotFoundException(`Car with index ${id} not found`);
    }
    const carUpdated = this.carsService.updateBrandCar(id, body.brand);
    return {
      car: carUpdated,
      code: 200,
    };
  }
}
