import { Router } from 'express';

import { OrderRepositoryImpl } from '../../database/repositories/order-repository-impl';
import { OrderController } from '../controllers/order-controller';
import { CreateOrderUseCase } from '../../../application/use-cases/order-use-cases/create-order-use-case';
import { OrderPizzaFlavorRepositoryImpl } from '../../database/repositories/order-pizza-flavor-repository-impl';
import { OrderPizzaToppingRepositoryImpl } from '../../database/repositories/order-pizza-topping-repository-impl';
import { GetOrderUseCase } from '../../../application/use-cases/order-use-cases/get-order-use-case';
import { GetAllOrdersUseCase } from '../../../application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../../application/use-cases/order-use-cases/get-all-client-orders-use-case';
import { UpdateOrderStatusUseCase } from '../../../application/use-cases/order-use-cases/update-order-status-use-case';
import { DeleteOrderUseCase } from '../../../application/use-cases/order-use-cases/delete-order-use-case';
import { OrderPizzaRepositoryImpl } from '../../database/repositories/order-pizza-repository.impl';
import { GetOrderPizzasUseCase } from '../../../application/use-cases/order-use-cases/get-order-pizzas-use-case';
import { UpdateOrderPizzasStatusUseCase } from '../../../application/use-cases/order-use-cases/update-order-pizzas-status-use-case';

const router = Router();

const orderRepository = new OrderRepositoryImpl();
const orderPizzaFlavorRepository = new OrderPizzaFlavorRepositoryImpl();
const orderPizzaRepository = new OrderPizzaRepositoryImpl();
const orderPizzaToppingRepository = new OrderPizzaToppingRepositoryImpl();
const orderController = new OrderController(
  new CreateOrderUseCase(
    orderRepository,
    orderPizzaRepository,
    orderPizzaFlavorRepository,
    orderPizzaToppingRepository,
  ),
  new GetOrderUseCase(orderRepository),
  new GetAllOrdersUseCase(orderRepository),
  new GetAllClientOrdersUseCase(orderRepository),
  new GetOrderPizzasUseCase(orderPizzaRepository),
  new UpdateOrderStatusUseCase(orderRepository),
  new UpdateOrderPizzasStatusUseCase(orderPizzaRepository),
  new DeleteOrderUseCase(orderRepository),
);

router.post('/order', (req, res) => orderController.createOrder(req, res));

router.get('/order/:orderId', (req, res) => orderController.getOrder(req, res));

router.get('/orders', (req, res) => orderController.getAllOrders(req, res));

router.get('/orders/:clientId', (req, res) =>
  orderController.getAllClientOrders(req, res),
);

router.get('/order-pizzas/:orderId', (req, res) =>
  orderController.getOrderPizzas(req, res),
);

router.patch('/order/:orderId', (req, res) =>
  orderController.updateOrderStatus(req, res),
);

router.patch('/order-pizzas/:orderPizzasId', (req, res) =>
  orderController.updateOrderPizzasStatus(req, res),
);

router.delete('/order/:orderId', (req, res) =>
  orderController.deleteOrder(req, res),
);

export default router;
