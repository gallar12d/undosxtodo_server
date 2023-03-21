import { DepotEntity } from "./depot.entity";
import { DepotValue } from "./depot.value";

export interface DepotRepository {
    insertDepot(depot: DepotValue):Promise<any | null>;
    getDepots(seller_id:string ):Promise<DepotEntity[] | null>;
    updateDepot(depot: DepotValue):Promise<any | null>;
    deleteDepot(id: string):Promise<any | null>;
}