import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('getAllCars', () => {
    expect(service.findAllCars()).toEqual(['chevrolet', 'toyota', 'hyundai']);
  });

  it('getCarById', () => {
    expect(service.findCarById(0)).toEqual('chevrolet');
    expect(service.findCarById(2)).toEqual('hyundai');
  });
});
