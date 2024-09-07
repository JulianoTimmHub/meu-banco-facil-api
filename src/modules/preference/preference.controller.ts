import { Body, Controller, Post } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { ChangeThemeDto } from './dto/change-theme.dto';

@Controller('preference')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Post('/changeTheme')
  async changeTheme (
    @Body() changeThemeDto: ChangeThemeDto
  ) {
    return await this.preferenceService.changeTheme(changeThemeDto);
  };
  
}
