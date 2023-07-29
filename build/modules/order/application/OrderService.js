var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OrderValue } from "../domain/order.value";
export class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        this.filterOrder = (order) => {
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
        };
    }
    registerOrder({ depot_name, depot_id, guide, guide_status, seller_id, seller_address, seller_city, seller_state, seller_telephone, seller_nit, seller_postal_code, seller_country, seller_email, client_name, client_surname, client_email, client_address, latitude, longitude, client_address_detail, client_city, client_state, client_telephone, products, client_country, value_to_collect, postalCode }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const orderCreated = yield this.orderRepository.registerOrder(orderValue, postalCode);
            // const order_response = {
            //   id: orderCreated.id,
            // };
            // return order_response;
            return orderCreated;
        });
    }
    updateOrder(id, { depot_name, depot_id, guide, guide_status, seller_id, seller_address, seller_city, seller_state, seller_telephone, seller_nit, seller_postal_code, seller_country, seller_email, client_name, client_surname, client_email, client_address, client_address_detail, client_city, client_state, client_telephone, products, client_country, value_to_collect }) {
        return __awaiter(this, void 0, void 0, function* () {
            products = JSON.parse(products);
            const old_order = yield this.orderRepository.findOrder(id);
            if (!old_order)
                throw new Error("Order not found");
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
            const orderUpdated = yield this.orderRepository.updateOrder(id, orderValue);
            const order_response = {
                id: orderUpdated.id,
            };
            return order_response;
        });
    }
    findOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let order = yield this.orderRepository.findOrder(id);
            if (!order)
                throw new Error("Order not found");
            order = order[0];
            return this.filterOrder(order);
        });
    }
    getOrdersPage(seller_id, pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepository.getOrdersPage(seller_id, pag);
            return orders;
        });
    }
    findOrderByGuide(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            let order = yield this.orderRepository.findOrderByGuide(guide);
            if (!order)
                throw new Error("Order not found");
            // order = order[0];
            return this.filterOrder(order);
        });
    }
    orderExist(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            if (guide) {
                const order = yield this.orderRepository.findOrderByGuide(guide);
                if (order)
                    return true;
                return false;
            }
            return false;
        });
    }
    allOrder(seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepository.allOrder(seller_id);
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
        });
    }
    insertStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedStatus = yield this.orderRepository.insertStatus();
            return insertedStatus;
        });
    }
    updateStatus(id, guide_status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedStatus = yield this.orderRepository.updateStatus(id, guide_status);
            return updatedStatus;
        });
    }
    allOrders(pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepository.allOrders(pag);
            return orders;
        });
    }
    ordersDate(rol, date, seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersDate = yield this.orderRepository.ordersDate(rol, date, seller_id);
            return ordersDate;
        });
    }
    authR99() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.authR99();
        });
    }
    createScenario() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.createScenario();
        });
    }
    orderReports(start, ending, seller_id, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.orderReports(start, ending, seller_id, rol);
        });
    }
    recentOrders(rol, seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.recentOrders(rol, seller_id);
        });
    }
    orderTraceability(code, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.orderTraceability(code, status);
        });
    }
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.getSettings();
        });
    }
    setSettings(limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.setSettings(limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes);
        });
    }
}
