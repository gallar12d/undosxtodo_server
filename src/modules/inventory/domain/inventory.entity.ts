export interface InventoryEntity {
    id: string,
    seller_id: string,
    product_id: string,
    quantity: number,
    // location: string,
    depot_id: string,
    // income_type: string,
    history?: []
}