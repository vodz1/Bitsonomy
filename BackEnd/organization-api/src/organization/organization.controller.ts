import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { InviteUserDto } from './dto/invite-user.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organization')
@UseGuards(AccessTokenGuard)
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post()
  async create(
    @Body() data: CreateOrganizationDto,
  ) {
    return this.orgService.create(data);
  }

  @Get()
  async findAll() {
    return this.orgService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.orgService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateOrganizationDto,
  ) {
    return this.orgService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.orgService.delete(id);
  }

  @Post(':organization_id/invite')
  async inviteUser(
    @Param('organization_id') organizationId: string,
    @Body() inviteUserDto: InviteUserDto,
  ): Promise<{ message: string }> {
    return this.orgService.inviteUser(organizationId, inviteUserDto.user_email);
  }
}
