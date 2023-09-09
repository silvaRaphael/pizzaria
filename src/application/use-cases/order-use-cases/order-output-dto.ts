import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/order-pizza-topping';
import { CreateOrderDTO } from './create-order-dto';

export interface OrderOutputDTO extends CreateOrderDTO {
  id: string;
  client_id: string;
  size: 0 | 1 | 2;
  price: number;
  orderPizzaFlavor: OrderPizzaFlavor[];
  orderPizzaTopping: OrderPizzaTopping[];
}
