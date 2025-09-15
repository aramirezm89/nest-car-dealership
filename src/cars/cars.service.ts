import { Injectable } from '@nestjs/common';
import { Car } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';

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

    return car;
  }

  createCar(carDTO: CreateCarDto): Car {
    const newCar = {
      id: uuidv4(),
      brand: carDTO.brand,
      model: carDTO.model,
    };
    this.cars.push(newCar);
    return newCar;
  }

  deleteCar(id: string): Car[] {
    this.cars = this.cars.filter((car) => car.id !== id);
    return this.cars;
  }

  updateBrandCar(id: string, brand: string): Car {
    const car = this.findCarById(id);

    if (!car) {
      throw new Error(`Car with index ${id} not found`);
    }

    car.brand = brand;

    return car;
  }
}
