import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { OrderRepositoryImpl } from '../../infrastructure/repositories/order-repository-impl';
import { OrderController } from '../controllers/order-controller';
import { CreateOrderUseCase } from '../../application/use-cases/order-use-cases/create-order-use-case';
import { OrderPizzaFlavorImpl } from '../../infrastructure/repositories/order-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../infrastructure/repositories/order-pizza-topping-repository-impl';
import { GetOrderUseCase } from '../../application/use-cases/order-use-cases/get-order-use-case';
import { GetAllOrdersUseCase } from '../../application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../application/use-cases/order-use-cases/get-all-client-orders-use-case';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/order-use-cases/update-order-status-use-case';

const router = Router();

const prismaClient = new PrismaClient();
const orderRepository = new OrderRepositoryImpl(prismaClient);
const orderPizzaFlavor = new OrderPizzaFlavorImpl(prismaClient);
const orderPizzaTopping = new OrderPizzaToppingImpl(prismaClient);
const orderController = new OrderController(
  new CreateOrderUseCase(orderRepository, orderPizzaFlavor, orderPizzaTopping),
  new GetOrderUseCase(orderRepository),
  new GetAllOrdersUseCase(orderRepository),
  new GetAllClientOrdersUseCase(orderRepository),
  new UpdateOrderStatusUseCase(orderRepository),
);

router.post('/order', (req, res) => orderController.createOrder(req, res));

router.get('/order/:orderId', (req, res) => orderController.getOrder(req, res));

router.get('/orders', (req, res) => orderController.getAllOrders(req, res));

router.get('/orders/:clientId', (req, res) =>
  orderController.getAllClientOrders(req, res),
);

router.put('/order/:orderId', (req, res) =>
  orderController.updateOrderStatus(req, res),
);

export default router;
