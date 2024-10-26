import { Expose, Type } from "class-transformer";
import { UserResDto } from "src/user/dto/create-userRes.dto";

export class OrganizationsRes {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => UserResDto)  // Applies the user DTO to each user in the array
  users: UserResDto[];
}
