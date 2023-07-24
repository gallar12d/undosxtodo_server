import { OrderRepository } from "../domain/order.respository";
import { OrderValue } from "../domain/order.value";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) { }

  public async registerOrder({
    depot_name,
    depot_id,
    guide,
    guide_status,
    seller_id,
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
    client_email,
    client_address,
    latitude,
    longitude,
    client_address_detail,
    client_city,
    client_state,
    client_telephone,
    products,
    client_country,
    value_to_collect,
    postalCode
  }) {
    products = JSON.parse(products);
    const orderValue = new OrderValue({
      depot_name,
      depot_id,
      guide,
      guide_status,
      seller_address,
      seller_id,
      seller_city,
      seller_state,
      seller_telephone,
      seller_nit,
      seller_postal_code,
      seller_country,
      seller_email,
      client_name,
      client_surname,
      client_email,
      client_address,
      latitude,
      longitude,
      client_address_detail,
      client_city,
      client_state,
      client_telephone,
      products,
      client_country,
      value_to_collect
    });

    const orderCreated = await this.orderRepository.registerOrder(orderValue, postalCode);
    // const order_response = {
    //   id: orderCreated.id,
    // };
    // return order_response;
    return orderCreated;
  }

  public async updateOrder(id: string, {
    depot_name,
    depot_id,
    guide,
    guide_status,
    seller_id,
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
    client_email,
    client_address,
    client_address_detail,
    client_city,
    client_state,
    client_telephone,
    products,
    client_country,
    value_to_collect
  }) {
    products = JSON.parse(products);
    const old_order = await this.orderRepository.findOrder(id);
    if (!old_order) throw new Error("Order not found");

    const orderValue = new OrderValue({
      depot_name,
      depot_id,
      guide: old_order.guide,
      guide_status,
      seller_id,
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
      client_email,
      client_address,
      client_address_detail,
      client_city,
      client_state,
      client_telephone,
      products,
      client_country,
      value_to_collect,
    });

    // const exist = await this.orderExist(guide);
    // if (exist) throw new Error("Order guide already exist");
    orderValue.id = id;
    const orderUpdated = await this.orderRepository.updateOrder(id, orderValue);
    const order_response = {
      id: orderUpdated.id,
    };
    return order_response;
  }

  public filterOrder = (order: any) => {
    const order_filtered = {
      id: order.id,
      depot_name: order.depot_name,
      depot_id: order.depot_id,
      guide: order.guide,
      guide_status: order.guide_status,
      seller_address: order.seller_address,
      seller_city: order.seller_city,
      seller_state: order.seller_state,
      seller_telephone: order.seller_telephone,
      seller_nit: order.seller_nit,
      seller_postal_code: order.seller_postal_code,
      seller_country: order.seller_country,
      seller_email: order.seller_email,
      client_name: order.client_name,
      client_surname: order.client_surname,
      client_address: order.client_address,
      client_address_detail: order.client_address_detail,
      client_city: order.client_city,
      client_state: order.client_state,
      client_telephone: order.client_telephone,
      products: order.products,
      client_country: order.client_country,
      value_to_collect: order.value_to_collect
    };

    return order_filtered;

  }

  public async findOrder(id: string) {
    let order = await this.orderRepository.findOrder(id);
    if (!order) throw new Error("Order not found");
    order = order[0];
    return this.filterOrder(order);

  }

  public async getOrdersPage(seller_id: string, pag: number) {
    const orders: any = await this.orderRepository.getOrdersPage(seller_id, pag);
    return orders;
  }

  public async findOrderByGuide(guide: string) {
    let order = await this.orderRepository.findOrderByGuide(guide);
    if (!order) throw new Error("Order not found");
    // order = order[0];
    return this.filterOrder(order);
  }

  public async orderExist(guide: string) {
    if (guide) {
      const order = await this.orderRepository.findOrderByGuide(guide);
      if (order) return true;
      return false;
    }
    return false;
  }

  public async allOrder(seller_id) {
    const orders: any = await this.orderRepository.allOrder(seller_id);
    let orders_filtered = {
      size: 0,
      orders: [],
    };
    orders_filtered.orders = orders.map((order) => {
      return {
        id: order.id,
        depot_name: order.depot_name,
        depot_id: order.depot_id,
        guide: order.guide,
        guide_status: order.guide_status,
        seller_id: order.seller_id,
        seller_address: order.seller_address,
        seller_city: order.seller_city,
        seller_state: order.seller_state,
        seller_telephone: order.seller_telephone,
        seller_nit: order.seller_nit,
        seller_postal_code: order.seller_postal_code,
        seller_country: order.seller_country,
        seller_email: order.seller_email,
        client_name: order.client_name,
        client_surname: order.client_surname,
        client_address: order.client_address,
        client_address_detail: order.client_address_detail,
        client_city: order.client_city,
        client_state: order.client_state,
        client_telephone: order.client_telephone,
        products: order.products,
        client_country: order.client_country,
        value_to_collect: order.value_to_collect,
        createdAt: order.createdAt
      };
    });

    orders_filtered.size = orders_filtered.orders.length;

    return orders_filtered;
  }

  public async insertStatus() {
    const insertedStatus = await this.orderRepository.insertStatus();
    return insertedStatus;
  }

  public async updateStatus(id, guide_status) {
    const updatedStatus = await this.orderRepository.updateStatus(id, guide_status);
    return updatedStatus;
  }

  public async allOrders(pag) {
    const orders = await this.orderRepository.allOrders(pag);
    return orders;
  }

  public async ordersDate(rol, date, seller_id) {
    const ordersDate = await this.orderRepository.ordersDate(rol, date, seller_id);
    return ordersDate;
  }

  public async authR99() {
    return this.orderRepository.authR99();
  }

  public async createScenario() {
    return this.orderRepository.createScenario();
  }

  public async orderReports(start: string, ending: string, seller_id: string, rol: string) {
    return this.orderRepository.orderReports(start, ending, seller_id, rol);
  }

  public async recentOrders(rol: string, seller_id: string) {
    return this.orderRepository.recentOrders(rol, seller_id);
  }

  public async orderTraceability(code: string, status: string) {
    return this.orderRepository.orderTraceability(code, status);
  }

  public async getSettings() {
    return this.orderRepository.getSettings();
  }
  public async setSettings(hour, minutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments) {
    return this.orderRepository.setSettings(hour, minutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments);
  }
}
