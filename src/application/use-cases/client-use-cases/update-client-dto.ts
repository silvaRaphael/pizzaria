import { CreateClientDTO } from './create-client-dto';

export interface UpdateClientDTO extends CreateClientDTO {
  id: string;
}
