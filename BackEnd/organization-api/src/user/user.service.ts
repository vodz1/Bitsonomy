import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from 'src/common/services/hash.service';

import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { UserResDto } from './dto/create-userRes.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async create(data: CreateUserDto) {
    const { email , password } = data;
    const existingUser = await this.userRepository.findByEmail(email)
    if(existingUser){
      throw new BadRequestException(ErrorMessages.user.emailExists)
    }
    data.password = await this.hashService.hash(password);
    const createdUser = await this.userRepository.create(data);
    return plainToInstance(UserResDto, createdUser, { excludeExtraneousValues: true });
  }

  getAll() {
    return this.userRepository.findAll();
  }

 
}
