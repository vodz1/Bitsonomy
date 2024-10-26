import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtSignService {
  constructor(private readonly jwtService: JwtService) {}

  accessTokenSign(payload: { id: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  refreshTokenSign(payload: { id: string }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH,
      expiresIn: '15h',
    });
  }
}
