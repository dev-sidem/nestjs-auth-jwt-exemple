import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const user = await this.usersService.findOneById(req.user.id);
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      phoneNumber: user.phoneNumber,
      typeUser: user.typeUser,
      role: user.role,
      emailVerified: user.emailVerified,
      createdDate: user.createdDate,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllUsers() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const user = await this.usersService.getAllUsers();
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateCurrentUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateCurrentUser(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      req.user.id,
      updateUserDto,
    );
    return {
      id: user.id,
      login: user.login,
      email: user.email,
      phoneNumber: user.phoneNumber,
      typeUser: user.typeUser,
      role: user.role,
      emailVerified: user.emailVerified,
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
    };
  }
}
