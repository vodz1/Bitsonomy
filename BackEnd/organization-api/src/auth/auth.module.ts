import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { AccessStrategy } from 'src/auth/strategies/access.strategy';
import { RefreshStrategy } from 'src/auth/strategies/refresh.strategy';
import { UserModule } from 'src/user/user.module';
import { RepositoryModule } from 'src/repositories/repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtSignService } from 'src/common/services/JwtSign.Service';
import { HashService } from 'src/common/services/hash.service';

@Module({
  imports: [PassportModule, UserModule, RepositoryModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtSignService,
    JwtService,
    LocalStrategy,
    AccessStrategy,
    RefreshStrategy,
    HashService,
  ],
})
export class AuthModule {}
