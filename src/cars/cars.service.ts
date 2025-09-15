import { Injectable } from '@nestjs/common';

export interface Car {
  id: number;
  brand: string;
  model: string;
}
@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: 1, brand: 'chevrolet', model: 'camaro' },
    { id: 2, brand: 'toyota', model: 'camry' },
    { id: 3, brand: 'hyundai', model: 'accent' },
  ];

  findAllCars(): Car[] {
    return this.cars;
  }

  findCarById(id: number): Car | undefined {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  createCar(car: Car): Car {
    this.cars.push(car);
    return car;
  }

  deleteCar(id: number): Car[] {
    this.cars = this.cars.filter((car) => car.id !== id);
    return this.cars;
  }

  updateBrandCar(id: number, brand: string): Car {
    const car = this.findCarById(id);

    if (!car) {
      throw new Error(`Car with index ${id} not found`);
    }

    car.brand = brand;

    return car;
  }
}
