import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { randomUUID } from 'crypto';
import { Profile } from './entities/profile.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: CreateProfileDto): Promise<CreateProfileDto> {
    const CreatedProfile = await this.prisma.profiles.create({
      data: { ...profile, id: randomUUID() },
    });
    return CreatedProfile;
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.prisma.profiles.findMany();
  }

  async getProfileById(profileId: string): Promise<Profile> {
    const foundProfile = await this.prisma.profiles.findUniqueOrThrow({
      where: { id: profileId },
    });
    return foundProfile;
  }

  async updateProfile(
    id: string,
    profileData: UpdateProfileDto,
  ): Promise<UpdateProfileDto> {
    const UpdatedProfile = await this.prisma.profiles.update({
      where: { id: id },
      data: profileData,
    });
    return UpdatedProfile;
  }

  async deleteProfileById(profileId: string): Promise<boolean> {
    try {
      const deletedProfile = await this.prisma.profiles.delete({
        where: { id: profileId },
      });
      if (deletedProfile) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
