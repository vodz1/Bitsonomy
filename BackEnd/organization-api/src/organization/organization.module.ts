import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { RepositoryModule } from 'src/repositories/repository.module';

@Module({
  imports : [
    RepositoryModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports : [OrganizationService]
})
export class OrganizationModule {}
