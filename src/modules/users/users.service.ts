import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<IUser> {
    const userEntity = { ...user, id: randomUUID() };

    if (user.password.length <= 7) {
      throw new Error('Invalid password');
    }

    const createdUser = await this.prisma.user.create({ data: userEntity });

    return createdUser;
  }

  async updateUser(userData: UpdateUserDto): Promise<IUser> {
    const updatedUser = await this.prisma.user.update({
      where: { id: userData.id },
      data: userData,
    });

    return updatedUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(userId: string): Promise<IUser> {
    const foundUser = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return foundUser;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: email },
    });

    return user;
  }

  async deleteUserById(userId: string): Promise<boolean> {
    const x = this.prisma.user.findUnique({ where: { id: userId } });

    if (!x) {
      throw new Error('Invalid password');
    }
    
    await this.prisma.user.delete({
      where: { id: userId },
    });

    return true;
  }
}
