import { CreatePizzaFlavorDTO } from './create-pizza-flavor-dto';

export interface UpdatePizzaFlavorDTO extends CreatePizzaFlavorDTO {
  id: string;
}
