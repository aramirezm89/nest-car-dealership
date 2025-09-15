import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import type { Car } from './interfaces';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
@UsePipes(ValidationPipe)
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
  getCarById(@Param('id', ParseUUIDPipe) id: string): {
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
  createCar(@Body() creteCarDto: CreateCarDto): { car: Car; code: number } {
    const newCar = this.carsService.createCar(creteCarDto);
    return {
      car: newCar,
      code: 201,
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string): {
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
    @Param('id', ParseUUIDPipe) id: string,
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
