import { v4 as uuid } from "uuid";
export class ProductValue {
    constructor({ depots_ids, sku, name, price, status, inventory_id }) {
        this.id = uuid();
        this.depots_ids = depots_ids;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.status = status;
        this.inventory_id = inventory_id;
    }
    ;
}
