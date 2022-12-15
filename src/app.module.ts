import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { DatabaseModule } from './prisma/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProfileModule , CarsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
