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
  };

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

  };

  public registerOrder = async (req, res) => {
    try {
      const order = await this.orderService.registerOrder(req.body);
      res.send(order);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  };

  public updateOrder = async (req, res) => {
    try {

      const order = await this.orderService.updateOrder(req.params.id, req.body);
      res.send(order);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  };
  
  public insertStatus = async (req, res) => {
    try {

      const newStatus = await this.orderService.insertStatus();
      res.send(newStatus);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  };

  public updateStatus = async ({body}, res) => {
    try {
      const {id, guide_status}= body;
      const updatedStatus = await this.orderService.updateStatus(id, guide_status);
      res.status(200).send(updatedStatus);
    } catch (err) {
      res.status(400).send(getErrorMessage(err));
    }
  };
}
