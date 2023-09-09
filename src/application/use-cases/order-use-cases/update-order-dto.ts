import { CreateOrderDTO } from './create-order-dto';

export interface UpdateOrderDTO extends CreateOrderDTO {
  id: string;
}
