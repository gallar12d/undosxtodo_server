import { OrderEntity } from "../../domain/order.entity";
import { OrderRepository } from "../../domain/order.respository";
import OrderModel from "../model/order.schema";

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

  public async allOrder(): Promise<any[] | null> {
    const orders = await OrderModel.find();
    return orders;
  }

  public async findOrderByGuide(guide: string): Promise<any | null> {
    const order = await OrderModel.findOne({ guide });
    return order;
  }
}
