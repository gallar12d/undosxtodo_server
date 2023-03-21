import mongoose from "mongoose";
import { OrderEntity } from "../../domain/order.entity";
import { OrderRepository } from "../../domain/order.respository";
import OrderModel from "../model/order.schema";
import StatusModel from '../model/status.schema';

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
    var orders = await OrderModel.find({seller_id: new mongoose.Types.ObjectId(seller_id)});

    for await (const order of orders) {
      order.guide_status=(await StatusModel.findOne({id: order.guide_status},{name:1})).name;
    }

    return orders;
  }

  public async findOrderByGuide(guide: string): Promise<any | null> {
    const order = await OrderModel.findOne({ guide });
    return order;
  }
  
  public async insertStatus(): Promise<any | null> {
    const statusToInsert=[
      {id: 1, name: "En procesamiento"},
      {id: 2, name: "Guía generada"},
      {id: 3, name: "Cancelado"},
      {id: 4, name: "Orden recogida"},
      {id: 5, name: "En reparto"},
      {id: 6, name: "Entregado"},
      {id: 7, name: "Devolución"},
    ];
    const status = await StatusModel.create(statusToInsert);
    return status;
  }

  public async updateStatus(id:string, guide_status): Promise<any | null> {
    const updatedStatus = await OrderModel.updateOne( {id: id}, {$set : { guide_status: guide_status } } );
    return updatedStatus;
  }
}
