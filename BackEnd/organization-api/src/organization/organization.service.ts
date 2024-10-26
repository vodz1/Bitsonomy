import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationRepository } from 'src/repositories/organization.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { Messages } from 'src/common/enums/messages.enum';
import { plainToInstance } from 'class-transformer';
import { OrganizationsRes } from './dto/organizations.res.dto';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly orgRepository: OrganizationRepository,
    private readonly userRepository : UserRepository
  ) {}

   create(data : CreateOrganizationDto) {
    return  this.orgRepository.create(data);
  }

  getAll() {
    const orgsWithMembers = this.orgRepository.findWithMembers();
    return plainToInstance(OrganizationsRes, orgsWithMembers, { excludeExtraneousValues: true });
  }

  async getById(id: string) {
    const organization = await this.orgRepository.findOneWithMembers(id);
    if (!organization) throw new NotFoundException(ErrorMessages.Organization.orgNotFound);
    return plainToInstance(OrganizationsRes, organization, { excludeExtraneousValues: true });;
  }

  async update(id: string, data : UpdateOrganizationDto) {
    const updatedOrg = await this.orgRepository.updateById(
      id,
      data
    );
    if (!updatedOrg) throw new NotFoundException(ErrorMessages.Organization.orgNotFound);
    return { message : Messages.Organization.updateOrg ,updatedOrg } ;
  }

  async delete(id: string) {
    const result = await this.orgRepository.deleteById(id);
    if (!result) throw new NotFoundException(ErrorMessages.Organization.orgNotFound);
    return { message: Messages.Organization.deleteOrg };
  }

  async inviteUser(
    organizationId: string,
    userEmail: string,
  ): Promise<{ message: string }> {
    const foundUser = await this.userRepository.findByEmail(userEmail);
    if(!foundUser){
      throw new BadRequestException(ErrorMessages.user.userNotFound)
    }

    const foundOrg = await this.orgRepository.findById(organizationId);
    if(!foundOrg){
      throw new BadRequestException(ErrorMessages.Organization.orgNotFound)
    }

    if(foundOrg.users.includes(foundUser.id)){
      throw new BadRequestException(ErrorMessages.user.userInOrg)
    }

    await this.orgRepository.addUserToOrganization(foundUser.id,organizationId)    
    return {
      message: `User ${userEmail} has been invited to the organization with ID ${organizationId}.`,
    };
  }
}
