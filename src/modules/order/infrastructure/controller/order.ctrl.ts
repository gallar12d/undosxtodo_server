import { request, response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { OrderService } from "../../application/OrderService";

export class OrderController {
  constructor(private orderService: OrderService) {}

  public findOrder = async (req, res) => {
    try {
      const order = await this.orderService.findOrder(req.params.id);
      res.status(200).send(order);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  };

  public allOrder = async (req, res) => {
    try {
      const orders = await this.orderService.allOrder();
      res.send(orders);
    } catch (error) {
      res.status(401).send(getErrorMessage(error));
    }
  };

  public registerOrder = async (req, res) => {
    try {
      const order = await this.orderService.registerOrder(req.body);
      res.send(order);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  };
}
