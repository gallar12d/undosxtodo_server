import { ZoneRepository } from "../domain/zone.repository"
import { ZoneValue } from "../domain/zone.value";

export class ZoneService {
    constructor(private readonly zoneRepository: ZoneRepository) { }

    public async setDefaultZones() {
        return await this.zoneRepository.setDefaultZones();
    }

    public async getZones() {
        return await this.zoneRepository.getZones();
    }

    public async createZone(name: string, codes: any) {
        return await this.zoneRepository.createZone(name, codes);
    }

    public async setZone(oldName: string, name: string, codes: any) {
        return await this.zoneRepository.setZone(oldName, name, codes);
    }

}