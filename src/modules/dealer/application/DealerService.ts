import { DealerEntity } from "../domain/dealer.entity";
import { DealerRepository } from "../domain/dealer.repository"
import { DealerValue } from "../domain/dealer.value";

export class DealerService {
    constructor(private readonly zoneRepository: DealerRepository) { }

    public async getDealers() {
        return this.zoneRepository.getDealers();
    }

    public async changeStatus(dealer_id: string, newStatus: string) {
        return this.zoneRepository.changeStatus(dealer_id, newStatus);
    }

    public async createDealer(newDealer: DealerEntity) {
        return this.zoneRepository.createDealer(newDealer);
    }

}