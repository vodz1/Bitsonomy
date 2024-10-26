import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { HashService } from 'src/common/services/hash.service';
import { JwtSignService } from 'src/common/services/JwtSign.Service';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtSignService: JwtSignService,
    private readonly hashService: HashService,
    private readonly usersRepository: UserRepository,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (user && (await this.hashService.compare(pass, user.password))) {
      const { id } = user;
      return { id };
    }
    return null;
  }

  async login(user: { id: string }) {
    const payload = { id: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSignService.accessTokenSign(payload),
      this.jwtSignService.refreshTokenSign(payload),
    ]);

    return { message : "User logged in successfully" , accessToken, refreshToken };
  }

  async refresh(userReq: { id: string }) {
    const foundUser = await this.usersRepository.findById(userReq.id);
    if (!foundUser) throw new BadRequestException(ErrorMessages.user.userNotFound);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSignService.accessTokenSign(userReq),
      this.jwtSignService.refreshTokenSign(userReq),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
