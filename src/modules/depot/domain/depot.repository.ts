import { DepotEntity } from "./depot.entity";
import { DepotValue } from "./depot.value";

export interface DepotRepository {
    insertDepot(depot: DepotValue): Promise<any | null>;
    getDepots(seller_id: string): Promise<any>;
    getDepotsPage(seller_id: string, pag: number): Promise<any>;
    updateDepot(depot: DepotValue): Promise<any | null>;
    deleteDepot(id: string): Promise<any | null>;
    allDepots(pag: number): Promise<any>;
}