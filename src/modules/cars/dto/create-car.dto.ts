import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  brand?: string;

  @ApiProperty()
  @IsString()
  model?: string;

  @ApiProperty()
  year?: Date;

  @ApiProperty()
  horse?: number;

  @ApiProperty()
  @IsString()
  traction?: string;

  @ApiProperty()
  @IsBoolean()
  modified?: boolean;

  @ApiProperty()
  @IsBoolean()
  sold?: boolean;
}
