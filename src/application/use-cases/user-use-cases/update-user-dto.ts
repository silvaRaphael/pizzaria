import { CreateUserDTO } from './create-user-dto';

export interface UpdateUserDTO extends Omit<CreateUserDTO, 'password'> {
	id: string;
	password?: string;
}
