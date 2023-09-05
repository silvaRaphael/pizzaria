import { CreatePizzaToppingDTO } from './create-pizza-topping-dto';

export interface UpdatePizzaToppingDTO extends CreatePizzaToppingDTO {
  id: string;
}
