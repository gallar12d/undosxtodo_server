import { DealerEntity } from "./dealer.entity";

export interface DealerRepository {
    getDealers(): Promise<DealerEntity[] | any | null>;
    createDealer(name: string, code: string, capacity: string, email: string, depot_ids: string): Promise<DealerEntity[] | any | null>;
}