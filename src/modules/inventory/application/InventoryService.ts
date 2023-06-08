import { InventoryEntity } from "../domain/inventory.entity";
import { InventoryRepository } from "../domain/inventory.repository"

export class InventoryService {
    constructor(private readonly inventoryRepository: InventoryRepository) { }

    public async createInventoryObj(myInventory: InventoryEntity) {
        return await this.inventoryRepository.createInventoryObj(myInventory);
    }

    public async getInventory() {
        return await this.inventoryRepository.getInventory();
    }

    public async editInventoryObj(inventoryObj: InventoryEntity, queryId: string) {
        return await this.inventoryRepository.editInventoryObj(inventoryObj, queryId);
    }
    public async getRelatedDepots(seller_id: string) {
        return await this.inventoryRepository.getRelatedDepots(seller_id);
    }

    public async getProducts(depot_id: string, seller_id: string) {
        return await this.inventoryRepository.getProducts(depot_id, seller_id);
    }

    public async subtractAmount(product_ids, depot_id, date, transacction_type) {
        return await this.inventoryRepository.subtractAmount(product_ids, depot_id, date, transacction_type);
    }

}