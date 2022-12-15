import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Cars, User } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  photo?: string;

}
