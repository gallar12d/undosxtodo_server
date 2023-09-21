import { OrderOutsourcingEntity } from "./orderOut.entity";
import { OrderValue } from "./orderOut.value"

export interface OrderRepository {
  registerOrder(order: OrderOutsourcingEntity, carrierId: number): Promise<any | null>;
  getOrdersPage(seller_id, pag): Promise<any | null>;
  getOrderOutDate(body): Promise<any | null>;
  allOutOrders(pag): Promise<any | null>;
  recentOutOrders(body): Promise<any | null>;
  setOrderStatus(event: any): Promise<any | null>;
  getOrderOutsourcing(order: any): Promise<any | null>;
  getOutDrivers(seller_id: any): Promise<any | null>;
}