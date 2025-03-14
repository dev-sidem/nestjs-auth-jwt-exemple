/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    await this.userService.updateConnectedStatus(user.id, true);
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        login: user.login,
        role: user.role,
      }),
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        role: user.role,
      },
    };
  }

  async logout(userId: string) {
    return this.userService.updateConnectedStatus(userId, false);
  }
}
