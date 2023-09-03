import { Request, Response } from 'express';

import { CreateOrderUseCase } from '../../application/use-cases/order-use-cases/create-order-use-case';
import { GetOrderUseCase } from '../../application/use-cases/order-use-cases/get-order-use-case';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/order-use-cases/update-order-status-use-case';
import { GetAllOrdersUseCase } from '../../application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../application/use-cases/order-use-cases/get-all-client-orders-use-case';

export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getOrderUseCase: GetOrderUseCase,
    private getAllOrdersUseCase: GetAllOrdersUseCase,
    private getAllClientOrdersUseCase: GetAllClientOrdersUseCase,
    private updateOrderStatusUseCase: UpdateOrderStatusUseCase,
  ) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    const { client_id, size, price, pizzaFlavorsIds, pizzaToppingsIds } =
      req.body;

    try {
      const order = await this.createOrderUseCase.execute({
        client_id,
        size,
        price,
        pizzaFlavorsIds,
        pizzaToppingsIds,
      });

      res.status(201).json({ id: order.id });
    } catch (error: any) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    try {
      const order = await this.getOrderUseCase.execute(orderId);

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.getAllOrdersUseCase.execute();

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllClientOrders(req: Request, res: Response): Promise<void> {
    const { clientId } = req.params;

    try {
      const orders = await this.getAllClientOrdersUseCase.execute(clientId);

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await this.updateOrderStatusUseCase.execute({
        order_id: orderId,
        status,
      });

      res.status(200).end();
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
