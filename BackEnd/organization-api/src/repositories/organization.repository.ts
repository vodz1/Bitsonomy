import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base.abstract.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Organization } from 'src/organization/entities/organization.entity';

@Injectable()
export class OrganizationRepository extends BaseAbstractRepository<Organization> {
  constructor(@InjectModel(Organization.name)private readonly orgRepository: Model<Organization>) {
    super(orgRepository);
  }

  findWithMembers(){
    return this.findAll().populate('users')
  }

  findOneWithMembers(id : string){
    return this.findById(id).populate('users')
  }


   addUserToOrganization(userId: string, orgId: string) {
    return this.orgRepository.findByIdAndUpdate(
        orgId,
        { $addToSet: { users: userId } }, 
        { new: true, useFindAndModify: false }  
    ).populate('users');  
}

}