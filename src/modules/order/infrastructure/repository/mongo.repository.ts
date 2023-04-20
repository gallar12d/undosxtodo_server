import mongoose from "mongoose";
import { OrderEntity } from "../../domain/order.entity";
import { OrderRepository } from "../../domain/order.respository";
import { OrderModel } from "../model/order.schema";
import StatusModel from '../model/status.schema';
import SellerModel from "../../../seller/infrastructure/model/seller.schema";

export class MongoRepository implements OrderRepository {
  public async findOrder(id: string): Promise<any | null> {
    const user = await OrderModel.find({ id });
    return user;
  }
  public async registerOrder(order: OrderEntity): Promise<any | null> {
    const orderCreated = await OrderModel.create(order);
    return orderCreated;
  }

  public async updateOrder(id: string, order: OrderEntity): Promise<any | null> {
    const orderUpdated = await OrderModel.findOneAndUpdate({ id }, order, {
      new: true,
    });
    return orderUpdated;
  }

  public async allOrder(seller_id): Promise<any[] | null> {
    var orders = await OrderModel.find({ seller_id: new mongoose.Types.ObjectId(seller_id) });
    orders = JSON.parse(JSON.stringify(orders));

    for await (const order of orders) {
      order.guide_status = (await StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name;
      order.createdAt = new Date(""+order.createdAt).toISOString().slice(0, 10);
    }

    return orders;
  }

  public async findOrderByGuide(guide: string): Promise<any | null> {
    const order = await OrderModel.findOne({ guide });
    return order;
  }

  public async insertStatus(): Promise<any | null> {
    const statusToInsert = [
      { id: 1, name: "En procesamiento" },
      { id: 2, name: "Guía generada" },
      { id: 3, name: "Cancelado" },
      { id: 4, name: "Orden recogida" },
      { id: 5, name: "En reparto" },
      { id: 6, name: "Entregado" },
      { id: 7, name: "Devolución" },
    ];
    const status = await StatusModel.create(statusToInsert);
    return status;
  }

  public async updateStatus(id: string, guide_status): Promise<any | null> {
    const updatedStatus = await OrderModel.updateOne({ id: id }, { $set: { guide_status: guide_status } });
    return updatedStatus;
  }

  public async allOrders(pag: number): Promise<any | null> {
    const options = {
      page: pag,
      limit: 7
    }
    var result = await OrderModel.paginate({}, options);
    const orders = JSON.parse(JSON.stringify(result));
    for await (const order of orders.docs) {
      order.guide_status = (await StatusModel.findOne({ id: order.guide_status })).name;
      order.seller = (await SellerModel.findOne({ _id: order.seller_id })).name
      order.createdAt = new Date(""+order.createdAt).toISOString().slice(0, 10);
    }
    return orders;
  }
}
