import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
    {
      id: uuid(),
      name: 'Ford',
      createdAt: new Date().getTime(),
    },
    {
      id: uuid(),
      name: 'Chevrolet',
      createdAt: new Date().getTime(),
    },
  ];
  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    if (this.brands.find((brand) => brand.name === name)) {
      throw new BadRequestException(`Brand with name ${name} already exists`);
    }
    const brand: Brand = {
      id: uuid(),
      name: name,
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: string): Brand {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with index ${id} not found`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDb = {
          ...brand,
          name: updateBrandDto.name,
          updatedAt: new Date().getTime(),
        };
        return brandDb;
      }
      return brand;
    });
    return brandDb;
  }

  remove(id: string): void {
    const brand = this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }
}
