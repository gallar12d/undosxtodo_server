import { DealerRepository } from "../domain/dealer.repository"
import { DealerValue } from "../domain/dealer.value";

export class DealerService {
    constructor(private readonly zoneRepository: DealerRepository) { }

    public async getDealers() {
        return 200;
    }

    public async createDealer(name: string, code: string, capacity: string, email: string, depot_ids: string) {
        return 200;
    }

}