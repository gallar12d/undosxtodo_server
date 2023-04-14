import { OrderEntity } from "./order.entity";

export interface OrderRepository {
  findOrder(id: string): Promise<OrderEntity | null>;
  registerOrder(order: OrderEntity): Promise<OrderEntity>;
  updateOrder(id: string, order: OrderEntity): Promise<OrderEntity>;
  allOrder(seller_id:any): Promise<OrderEntity[] | null>;
  findOrderByGuide(guide: string): Promise<OrderEntity | null>;
  insertStatus(): Promise<any | null>;
  updateStatus(id, guide_status): Promise<any | null>;
  allOrders(pag:number): Promise<any | null>;
}
