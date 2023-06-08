import { InventoryEntity } from "./inventory.entity";

export interface InventoryRepository {
    createInventoryObj(inventory: InventoryEntity): Promise<InventoryEntity[] | any | null>;
    getInventory(): Promise<InventoryEntity[] | any | null>;
    editInventoryObj(inventoryObj: InventoryEntity, queryId: string): Promise<InventoryEntity[] | any | null>;
    getRelatedDepots(seller_id: string): Promise<InventoryEntity[] | any | null>;
    getProducts(depot_id: string): Promise<InventoryEntity[] | any | null>;
}