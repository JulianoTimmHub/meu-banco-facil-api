import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from 'src/types/user.type';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor( private readonly userService: UserService) { }

  @Post()
  async createUser (
    @Body() createUserDto: CreateUserDto
  ): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

}