import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    if (user) {
      throw new ConflictException("User is already registered!");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.prismaService.user.create({
      data: {
        email,
        username,
        hashedPassword: hashPassword
      }      
    });

    console.log("User created: ", {createdUser})
    
    return { 
      ...createdUser
    }
  }
}