import { v4 as uuid } from "uuid";
export class InventoryValue {
    constructor({ seller_id, product_id, quantity, depot_id, income_type, history, status }) {
        this.id = uuid();
        this.seller_id = seller_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.depot_id = depot_id;
        this.income_type = income_type;
        this.history = history;
        this.status = status;
    }
}
