import { Entity, Column, BeforeInsert } from 'typeorm';
import { ModelEntity } from './model.entity';
import { RoleEnum } from '../enums/role.enum';
import * as bcrypt from 'bcrypt';

type BcryptHash = (
  data: string,
  saltOrRounds: string | number,
) => Promise<string>;

@Entity('users')
export class UserEntity extends ModelEntity {
  @Column({ name: 'login', length: 225, unique: true, nullable: false })
  login: string = '';

  @Column({ name: 'email', nullable: true })
  email: string = '';

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string = '';

  @Column({ name: 'type_user', nullable: true })
  typeUser: string = '';

  @Column({ name: 'role', default: RoleEnum.CLIENT })
  role: string = RoleEnum.CLIENT.toString();

  @Column({ name: 'password', length: 225 })
  password: string = '';

  @Column({ name: 'active', default: true })
  active: boolean = true;

  @Column({ name: 'connected', default: false })
  connected: boolean = false;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean = false;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const hashFunc = bcrypt.hash as BcryptHash;
      this.password = await hashFunc(this.password, 10);
    }
  }
}
