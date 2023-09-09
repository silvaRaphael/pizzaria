import { Request, Response } from 'express';
import fs from 'node:fs';

import { CreateOrderUseCase } from '../../../application/use-cases/order-use-cases/create-order-use-case';
import { GetOrderUseCase } from '../../../application/use-cases/order-use-cases/get-order-use-case';
import { GetAllOrdersUseCase } from '../../../application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../../application/use-cases/order-use-cases/get-all-client-orders-use-case';
import { UpdateOrderStatusUseCase } from '../../../application/use-cases/order-use-cases/update-order-status-use-case';
import { UpdateOrderUseCase } from '../../../application/use-cases/order-use-cases/update-order-use-case';
import { DeleteOrderUseCase } from '../../../application/use-cases/order-use-cases/delete-order-use-case';

export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getOrderUseCase: GetOrderUseCase,
    private getAllOrdersUseCase: GetAllOrdersUseCase,
    private getAllClientOrdersUseCase: GetAllClientOrdersUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,
    private updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    private deleteOrderUseCase: DeleteOrderUseCase,
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
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    try {
      const order = await this.getOrderUseCase.execute(orderId);

      res.status(200).json(order);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.getAllOrdersUseCase.execute();

      let actionsButton = fs.readFileSync(
        'views/partials/actions-dropdown.hbs',
        'utf8',
      );

      const response = orders.map((item, index) => {
        let actions = actionsButton;
        actions = actions.replace('{{edit}}', `editOrder('${item.id}')`);
        actions = actions.replace('{{delete}}', `deleteOrder('${item.id}')`);

        return {
          ...item,
          size: ['Pequena', 'Média', 'Grande'][item.size],
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(item.price),
          '#': index + 1,
          actions,
        };
      });

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllClientOrders(req: Request, res: Response): Promise<void> {
    const { clientId } = req.params;

    try {
      const orders = await this.getAllClientOrdersUseCase.execute(clientId);

      let actionsButton = fs.readFileSync(
        'views/partials/actions-dropdown.hbs',
        'utf8',
      );

      const response = orders.map((item, index) => {
        let actions = actionsButton;
        actions = actions.replace('{{edit}}', `editOrder('${item.id}')`);
        actions = actions.replace('{{delete}}', `deleteOrder('${item.id}')`);

        return {
          ...item,
          size: ['Pequena', 'Média', 'Grande'][item.size],
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(item.price),
          '#': index + 1,
          actions,
        };
      });

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { client_id, size, price, pizzaFlavorsIds, pizzaToppingsIds } =
      req.body;

    try {
      await this.updateOrderUseCase.execute({
        id: orderId,
        client_id,
        size,
        price,
        pizzaFlavorsIds,
        pizzaToppingsIds,
      });

      res.status(204).end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await this.updateOrderStatusUseCase.execute({
        id: orderId,
        status,
      });

      res.status(204).end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;

    try {
      await this.deleteOrderUseCase.execute(orderId);

      res.status(204).end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
