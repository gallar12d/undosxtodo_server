import { OrderEntity } from "./order.entity";

export interface OrderRepository {
  findOrder(id: string): Promise<OrderEntity | null>;
  registerOrder(order: OrderEntity): Promise<OrderEntity>;
  updateOrder(id: string, order: OrderEntity): Promise<OrderEntity>;
  allOrder(seller_id: any): Promise<OrderEntity[] | null>;
  getOrdersPage(seller_id: string, pag: number): Promise<OrderEntity[] | null>;
  findOrderByGuide(guide: string): Promise<OrderEntity | null>;
  insertStatus(): Promise<any | null>;
  updateStatus(id: any, guide_status: any): Promise<any | null>;
  allOrders(pag: number): Promise<any | null>;
  ordersDate(rol: string, date: string, seller_id: string): Promise<any | null>;
  authR99(): Promise<any | null>;
  createScenario(): Promise<any | null>;
  orderReports(start: string, ending: string, seller_id: string, rol: string): Promise<any | null>;
  recentOrders(rol: string, seller_id: string): Promise<any | null>;
}