import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { OrderService } from "../../application/OrderOutService";
import { OrderValue } from '../../domain/orderOut.value';

export class OrderController {
  constructor(private orderService: OrderService) { }

  public registerOrder = async ({ body }, res) => {
    try {
      body.orderItem = JSON.parse(body.orderItem);
      const carrierId = body.carrierId;
      delete body.carrierId;
      const orderOutsourcingValue = new OrderValue(body);
      res.json(await this.orderService.registerOrder(orderOutsourcingValue, carrierId));
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

  public getOrderOutDate = async ({ body }, res) => {
    try {
      res.json(await this.orderService.getOrderOutDate(body));
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public recentOutOrders = async ({ body }, res) => {
    try {
      res.json(await this.orderService.recentOutOrders(body));
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public allOutOrders = async ({ params }, res) => {
    try {
      res.json(await this.orderService.allOutOrders(params.pag));
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

  public getOrderOutsourcing = async ({ body }, res) => {
    try {
      res.json(await this.orderService.getOrderOutsourcing(body));
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public getOutDrivers = async (req, res) => {
    try {
      res.json(await this.orderService.getOutDrivers());
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

}
