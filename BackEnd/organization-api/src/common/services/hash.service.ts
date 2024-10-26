import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Constants } from '../constants/constants';
import { ErrorMessages } from '../enums/error-messages.enum';

@Injectable()
export class HashService {
  constructor() {}

  hash(data: string): Promise<string> {
    if (data.length > Constants.password.MAX_LENGTH)
      throw new BadRequestException(ErrorMessages.passowrd.MAX_LENGTH);

    return bcrypt.hash(data, 10);
  }

  compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
