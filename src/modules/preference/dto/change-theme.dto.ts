import { IsNotEmpty, IsString } from "class-validator";

export class ChangeThemeDto {
  @IsString()
  @IsNotEmpty()
  readonly theme: string;
}