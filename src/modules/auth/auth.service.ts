import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login-input.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { IUser } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate({ email, password }: UserLoginDto) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email');
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new Error('Invalid password');
    }

    delete user.password;
    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        name: user.name,
        role: user.role,
      }),
      user,
    };
  }

  async getUser(email: string): Promise<IUser> {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }
}
