import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { IUser } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAllUser(): Promise<IUser[]> {
    return await this.service.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<IUser> {
    try {
      return await this.service.getUserById(userId);
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  async createUser(
    @Body() { cpf, email, password, name, role }: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.createUser({
        cpf,
        email,
        password,
        name,
        role,
      });

      response.status(201).send(result);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  @Patch()
  async updateUser(@Body() userData: UpdateUserDto): Promise<IUser> {
    try {
      return await this.service.updateUser(userData);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') userId: string): Promise<string> {
    const userIsDeleted = await this.service.deleteUserById(userId);
    console.log(userIsDeleted);
    if (userIsDeleted) {
      return 'User deleted successfully';
    } else {
      return 'User not found';
    }
  }
}
