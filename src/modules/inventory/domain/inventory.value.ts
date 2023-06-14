import { v4 as uuid } from "uuid";
import { InventoryEntity } from "./inventory.entity";

export class InventoryValue implements InventoryEntity {
    id: string;
    seller_id: string;
    product_id: string;
    quantity: number;
    depot_id: string;
    income_type: string;
    history?: [];
    status: string;

    constructor({
        seller_id,
        product_id,
        quantity,
        depot_id,
        income_type,
        history,
        status
    }: {
        seller_id: string;
        product_id: string;
        quantity: number;
        depot_id: string;
        income_type: string;
        history?: [];
        status: string;
    }) {
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