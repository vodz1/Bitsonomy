import { Exclude, Expose } from "class-transformer";

export class UserResDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
