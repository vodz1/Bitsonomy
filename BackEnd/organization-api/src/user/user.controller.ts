import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
