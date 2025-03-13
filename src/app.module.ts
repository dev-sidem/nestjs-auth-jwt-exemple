import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  //imports: [TypeOrmModule.forRoot(databaseConfig), UserModule, AuthModule],
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: 'votre-clé-secrète',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
