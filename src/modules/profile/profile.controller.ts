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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(
    @Body() { name, photo }: CreateProfileDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.profileService.createProfile({
        name,
        photo,
      });
      response.status(201).send(result);
    } catch (error) {
      throw new Error('Error in create');
    }
  }

  @Get()
  async getAllProfiles(): Promise<Profile[]> {
    return this.profileService.getAllProfiles();
  }

  @Get(':id')
  async getProfileById(@Param('id') profileId: string): Promise<Profile> {
    try {
      return await this.profileService.getProfileById(profileId);
    } catch (error) {
      throw new Error('not found');
    }
  }

  @Patch(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() profileData: UpdateProfileDto,
  ): Promise<UpdateProfileDto> {
    try {
      return await this.profileService.updateProfile(id, profileData);
    } catch (error) {
      throw new Error('id not found');
    }
  }

  @Delete(':id')
  async DeleteProfileById(@Param('id') profileId: string): Promise<string> {
    const profileIsDeleted = await this.profileService.deleteProfileById(
      profileId,
    );
    if (profileIsDeleted) {
      return 'Profile deleted success';
    } else {
      return 'Profile not found';
    }
  }
}
