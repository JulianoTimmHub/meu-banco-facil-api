import { Injectable } from '@nestjs/common';
import { Preference } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ChangeThemeDto } from './dto/change-theme.dto';
import { themeResponse } from 'src/types/preference.type';

@Injectable()
export class PreferenceService {
  constructor(private readonly prismaService: PrismaService) { }

  async changeTheme(
    changeThemeDto: ChangeThemeDto
  ): Promise<themeResponse> {
    const { theme } = changeThemeDto;

    let preference: Preference = await this.prismaService.preference.findFirst({
      where: {
        theme: theme
      }
    });

    if (!preference) {
      preference = await this.prismaService.preference.upsert({
        where: { theme: "light" },
        update: {},
        create: { theme: "light" }
      });
    } else {
      preference = await this.prismaService.preference.update({
        where: {
          id: preference.id
        },
        data: {
          theme: theme
        }
      });
    }

    console.log("New theme: ", preference.theme);

    return {
      theme: preference.theme
    }
  }

}