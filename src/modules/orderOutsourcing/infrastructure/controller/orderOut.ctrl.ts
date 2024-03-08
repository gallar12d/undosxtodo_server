import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { OrderService } from "../../application/OrderOutService";
import { OrderValue } from '../../domain/orderOut.value';
import jwt from "jsonwebtoken";
const SECRET_KEY = `${process.env.SECRET_KEY || "secret@123"}`;

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
      console.log(err);
      // err.message = err.response.data.errors;
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

  public setOrderStatus = async (req, res) => {
    try {
      // const { token } = req.headers;
      // if (!token) {
      //   throw new Error("Please authenticate");
      // }
      // const decoded = jwt.verify(token, SECRET_KEY);
      // console.log('Token verificado: ' + decoded);
      res.json(await this.orderService.setOrderStatus(req.body));
    } catch (err) {
      res.status(400).json(getErrorMessage(err));
      console.log('Error al verificar el token');
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
      res.json(await this.orderService.getOutDrivers(req.body.seller_id));
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

}
