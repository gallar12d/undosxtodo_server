import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { OrderService } from "../../application/OrderService";

export class OrderController {
  constructor(private orderService: OrderService) { }

  public findOrder = async (req: Request, res: Response) => {
    try {
      const order = await this.orderService.findOrderByGuide(req.params.id);
      res.status(200).send(order);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public getOrdersPage = async ({ body }: Request, res: Response) => {
    try {
      const { seller_id, pag } = body;
      const orders = await this.orderService.getOrdersPage(seller_id, pag);
      res.status(200).send(orders);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public allOrder = async (req, res) => {
    if (req.query.guide) {
      console.log(req.query.guide);
      try {
        const order = await this.orderService.findOrderByGuide(req.query.guide);
        res.status(200).send(order);
      } catch (err) {
        res.status(400).send(getErrorMessage(err));
      }
    }
    else {
      try {
        const orders = await this.orderService.allOrder(req.query.seller_id);
        res.send(orders);
      } catch (error) {
        res.status(401).send(getErrorMessage(error));
      }

    }

  }

  public registerOrder = async (req, res) => {
    try {
      const order = await this.orderService.registerOrder(req.body);
      res.json(order);
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public getSettings = async (req, res) => {
    try {
      const limitHour = await this.orderService.getSettings();
      res.json(limitHour);
    } catch (err) {
      res.status(400).json(getErrorMessage(err));
    }
  }

  public setSettings = async ({ body }, res) => {
    try {
      const { limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes } = body;
      res.json(await this.orderService.setSettings(limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes));
    } catch (err) {
      res.status(400).json(getErrorMessage(err));
    }
  }

  public updateOrder = async (req, res) => {
    try {

      const order = await this.orderService.updateOrder(req.params.id, req.body);
      res.send(order);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public insertStatus = async (req, res) => {
    try {

      const newStatus = await this.orderService.insertStatus();
      res.send(newStatus);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public updateStatus = async ({ body }, res) => {
    try {
      const { id, guide_status } = body;
      const updatedStatus = await this.orderService.updateStatus(id, guide_status);
      res.status(200).send(updatedStatus);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public allOrders = async ({ params }, res) => {
    try {
      var { pag } = params;
      const orders = await this.orderService.allOrders(pag);
      res.status(200).send(orders);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public ordersDate = async ({ body }, res) => {
    try {
      const { rol, date, seller_id } = body;
      if (rol === 'superuser') {
        const ordersDate = await this.orderService.ordersDate(rol, date, '');
        res.status(200).send(ordersDate);
      } else if (rol === 'admin') {
        const ordersDate = await this.orderService.ordersDate(rol, date, seller_id);
        res.status(200).send(ordersDate);
      }
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public deleteScenario = async (req, res) => {
    try {
      // res.json(await this.orderService);
      res.json({ m: "Eliminando escenario" });
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  };

  public orderReports = async ({ body }, res) => {
    try {
      const { start, ending, seller_id, rol } = body;
      res.send(await this.orderService.orderReports(start, ending, seller_id, rol));
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public recentOrders = async ({ body }, res) => {
    try {
      const { rol, seller_id } = body;
      res.send(await this.orderService.recentOrders(rol, seller_id));
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  }

  public orderTraceability = async ({ body }, res) => {
    try {
      const { code, status } = body;
      res.status(200).json(await this.orderService.orderTraceability(code, status));
    } catch (err) {
      res.status(400).json(getErrorMessage(err));
    }
  }
}
