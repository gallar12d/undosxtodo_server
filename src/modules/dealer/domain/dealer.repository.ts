import { DealerEntity } from "./dealer.entity";

export interface DealerRepository {
    getDealers(): Promise<DealerEntity[] | any | null>;
    createDealer(newDealer: DealerEntity): Promise<DealerEntity[] | any | null>;
    changeStatus(dealer_id: string, newStatus: string): Promise<DealerEntity[] | any | null>;
}