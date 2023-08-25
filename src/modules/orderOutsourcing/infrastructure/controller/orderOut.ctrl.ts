import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { OrderService } from "../../application/OrderOutService";
import { OrderValue } from '../../domain/orderOut.value';

export class OrderController {
  constructor(private orderService: OrderService) { }

  public registerOrder = async ({ body }, res) => {
    try {
      body.orderItem = JSON.parse(body.orderItem);
      const orderOutsourcingValue = new OrderValue(body);
      // const order = await this.orderService.registerOrder(orderOutsourcingValue);
      res.json(await this.orderService.registerOrder(orderOutsourcingValue));
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public getOrdersPage = async ({ body }, res) => {
    try {
      const { seller_id, pag } = body;
      res.json(await this.orderService.getOrdersPage(seller_id, pag));
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public setOrderStatus = async ({ body }, res) => {
    try {
      res.json(await this.orderService.setOrderStatus(body));
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

}
