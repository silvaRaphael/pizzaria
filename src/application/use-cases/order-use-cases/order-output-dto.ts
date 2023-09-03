import { CreateOrderDTO } from './create-order-dto';
import { OrderPizzaFlavor } from '../../../domain/entities/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/entities/order-pizza-topping';
import { PizzaSizes } from '../../../domain/entities/order';

export interface OrderOutputDTO extends CreateOrderDTO {
  id: string;
  client_id: string;
  size: PizzaSizes;
  price: number;
  orderPizzaFlavor: OrderPizzaFlavor[];
  orderPizzaTopping: OrderPizzaTopping[];
}
