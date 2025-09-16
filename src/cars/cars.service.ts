import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuidv4(), brand: 'chevrolet', model: 'camaro' },
    { id: uuidv4(), brand: 'toyota', model: 'camry' },
    { id: uuidv4(), brand: 'hyundai', model: 'accent' },
  ];

  findAllCars(): Car[] {
    return this.cars;
  }

  findCarById(id: string): Car | undefined {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with index ${id} not found`);
    }

    return car;
  }

  createCar(carDTO: CreateCarDto): Car {
    const newCar: Car = {
      id: uuidv4(),
      ...carDTO,
    };
    this.cars.push(newCar);
    return newCar;
  }

  deleteCar(id: string): void {
    this.findCarById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }

  updateBrandCar(id: string, updateCarDto: UpdateCarDto): Car {
    const car = this.findCarById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException('Id cannot be updated');
    }
    // Filtrar propiedades undefined para evitar sobrescribir con valores vacíos
    const updateData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(updateCarDto).filter(([_, value]) => value !== undefined),
    );
    Object.assign(car!, updateData);

    return car!;
  }
}
