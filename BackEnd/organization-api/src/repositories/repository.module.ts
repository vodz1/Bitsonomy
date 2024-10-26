import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationSchema,
} from 'src/organization/entities/organization.entity';
import { User, UserSchema } from 'src/user/entities/user.schema';
import { OrganizationRepository } from './organization.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UserRepository , OrganizationRepository],
  exports: [UserRepository , OrganizationRepository],
})
export class RepositoryModule {}
