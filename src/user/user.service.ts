import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserEntity } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(registerDto: RegisterDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (userExists) {
      throw new ConflictException('Cet email existe déjà');
    }

    const user = this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOneByLogin(login: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new NotFoundException(
        `L'utilisateur avec le login ${login} n'a pas été trouvé`,
      );
    }
    return user;
  }

  async updateCurrentUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findOneById(id);
    const updatedUser = {
      ...user,
      ...updateUserDto,
      updatedDate: new Date(),
    };

    await this.userRepository.save(updatedUser);
    return this.findOneById(id);
  }

  async updateConnectedStatus(id: string, connected: boolean): Promise<void> {
    await this.userRepository.update(id, { connected });
  }
}
