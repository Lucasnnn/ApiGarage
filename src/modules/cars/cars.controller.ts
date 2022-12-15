import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async createCar(
    @Body()
    { brand, model, year, horse, traction, modified, sold }: CreateCarDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.carsService.create({
        brand,
        model,
        year,
        horse,
        traction,
        modified,
        sold,
      });

      return result;
    } catch (error) {
      throw new Error('Error in create');
    }
  }

  @Get()
  async getAll(): Promise<Car[]> {
    return this.carsService.getAll();
  }

  @Get(':id')
  async getId(@Param('id') id: string): Promise<Car> {
    try {
      return await this.carsService.getId(id);
    } catch (error) {
      throw new Error('id not found');
    }
  }

  @Patch(':id')
  async updateCar(
    @Param('id') id: string,
    @Body() UpdateCarDto: UpdateCarDto,
  ): Promise<UpdateCarDto> {
    try {
      return await this.carsService.update(id, UpdateCarDto);
    } catch (error) {
      throw new Error('Error in create');
    }
  }

  @Delete(':id')
  async DeleteGameById(@Param('id') id: string): Promise<string> {
    const gameIsDeleted = await this.carsService.delete(id);
    if (gameIsDeleted) {
      return 'car deleted success';
    } else {
      return 'car not found';
    }
  }
}
