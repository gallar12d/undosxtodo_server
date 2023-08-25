import { OrderRepository } from "../domain/orderOut.respository";
import { OrderValue } from "../domain/orderOut.value";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) { }

  public async registerOrder(order: any) {
    const orderCreated = await this.orderRepository.registerOrder(order);
    return orderCreated;
  }

  public async getOrdersPage(seller_id: any, pag) {
    return await this.orderRepository.getOrdersPage(seller_id, pag);
  }

  public async setOrderStatus(event: any) {
    return await this.orderRepository.setOrderStatus(event);
  }
}