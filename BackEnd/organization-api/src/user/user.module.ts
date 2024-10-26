import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashService } from 'src/common/services/hash.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
