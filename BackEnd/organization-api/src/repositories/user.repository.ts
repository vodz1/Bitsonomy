import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base.abstract.repository';
import { User } from 'src/user/entities/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  constructor(@InjectModel(User.name) userRepository: Model<User>) {
    super(userRepository);
  }

  findByEmail(email: string) {
    return this.findOneWhere({ email }).populate('organization').exec();
  }
}
