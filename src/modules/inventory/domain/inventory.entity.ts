export interface InventoryEntity {
    id: string,
    seller_id: string,
    product_id: string,
    quantity: number,
    depot_id: string,
    history?: [],
    status: string
}