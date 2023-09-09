import { CreateUserDTO } from './create-user-dto';

export interface UpdateUserDTO extends CreateUserDTO {
  id: string;
}
