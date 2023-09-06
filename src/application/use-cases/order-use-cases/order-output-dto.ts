import { PizzaSizes } from '../../../domain/order';
import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/order-pizza-topping';
import { CreateOrderDTO } from './create-order-dto';

export interface OrderOutputDTO extends CreateOrderDTO {
  id: string;
  client_id: string;
  size: PizzaSizes;
  price: number;
  orderPizzaFlavor: OrderPizzaFlavor[];
  orderPizzaTopping: OrderPizzaTopping[];
}
