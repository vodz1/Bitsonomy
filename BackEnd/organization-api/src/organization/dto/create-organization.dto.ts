import { IsString, IsNotEmpty} from "class-validator";

export class CreateOrganizationDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    description: string;
  
}
