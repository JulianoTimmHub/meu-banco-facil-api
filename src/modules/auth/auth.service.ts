import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { compare } from 'bcrypt';
import { SignInResponse } from 'src/types/auth.type';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signIn (
    signInDto: SignInDto
  ): Promise<SignInResponse> {
    const { email, password } = signInDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new NotFoundException("Usuário não encontrado!");
    }

    const hasUser = await compare(password, user.hashedPassword);

    if (!hasUser) {
      throw new UnauthorizedException('Credenciais incorretas!');
    }

    console.log("Usuário logado: ", user)

    return {
      username: user.username
    }
  }

}
