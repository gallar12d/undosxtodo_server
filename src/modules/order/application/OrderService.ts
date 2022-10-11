import { OrderRepository } from "../domain/order.respository";
import { OrderValue } from "../domain/order.value";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async registerOrder({
    winery_name,
    guide,
    guide_status,
    seller_address,
    seller_city,
    seller_state,
    seller_telephone,
    seller_nit,
    seller_postal_code,

    seller_country,
    seller_email,
    client_name,
    client_surname,
    client_address,
    client_city,
    client_state,
    client_telephone,
    products,
    client_country,
    value_to_collect,
  }) {
    const orderValue = new OrderValue({
      winery_name,
      guide,
      guide_status,
      seller_address,
      seller_city,
      seller_state,
      seller_telephone,
      seller_nit,
      seller_postal_code,
      seller_country,
      seller_email,
      client_name,
      client_surname,
      client_address,
      client_city,
      client_state,
      client_telephone,
      products,
      client_country,
      value_to_collect,
    });

    const exist = await this.orderExist(guide);
    if (exist) throw new Error("Order guide already exist");

    const orderCreated = await this.orderRepository.registerOrder(orderValue);
    const order_response = {
      id: orderCreated.id,
    };
    return order_response;
  }

  public async findOrder(id: string) {
    const order = await this.orderRepository.findOrder(id);
    return order;
  }

  public async orderExist(guide: string) {
    if (guide) {
      const order = await this.orderRepository.findOrderByGuide(guide);
      if (order) return true;
      return false;
    }
    return false;
  }

  public async allOrder() {
    const orders = await this.orderRepository.allOrder();
    return orders;
  }
}
