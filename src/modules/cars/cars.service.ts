import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async create(car: CreateCarDto): Promise<CreateCarDto> {
    
    // const carCreate = await this.prisma.cars.create({
    //   data: { ...car, id: randomUUID() },
    // });

    return ;
  }

  async getAll(): Promise<Car[]> {
    return await this.prisma.cars.findMany();
  }

  async getId(id: string): Promise<Car> {
    const car = await this.prisma.cars.findUniqueOrThrow({
      where: { id: id },
    });

    return car;
  }

  async update(id: string, data: UpdateCarDto): Promise<UpdateCarDto> {
    const upCar = await this.prisma.cars.update({
      where: { id: id },
      data: data,
    });
    return upCar;
  }

  async delete(id: string): Promise<boolean> {
    try {
      const dell = await this.prisma.cars.delete({
        where: { id: id },
      });
      if (dell) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
