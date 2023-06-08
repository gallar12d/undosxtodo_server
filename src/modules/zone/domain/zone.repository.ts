import { ZoneEntity } from "./zone.entity";

export interface ZoneRepository {
  setDefaultZones(): Promise<any>;
  getZones(): Promise<ZoneEntity[] | any | null>;
  createZone(name: string, codes: any): Promise<ZoneEntity[] | any | null>;
  setZone(oldName: string, name: string, codes: any): Promise<ZoneEntity[] | any | null>;
}