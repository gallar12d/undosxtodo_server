import { OrderOutsourcingEntity } from "./orderOut.entity";
import { OrderValue } from "./orderOut.value"

export interface OrderRepository {
  registerOrder(order: OrderOutsourcingEntity): Promise<any | null>;
  getOrdersPage(seller_id, pag): Promise<any | null>;
  setOrderStatus(event: any): Promise<any | null>;
}