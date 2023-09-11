import { CreateOrderDTO } from './create-order-dto';

export interface UpdateOrderDTO extends Omit<CreateOrderDTO, 'client_id'> {
  id: string;
}
