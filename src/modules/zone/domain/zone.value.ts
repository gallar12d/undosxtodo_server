import { v4 as uuid } from "uuid";
import { ZoneEntity } from "./zone.entity";

export class ZoneValue implements ZoneEntity {
    id: string;
    name: string;
    codes: [];
    cityId: string;

    constructor({
        name,
        codes,
        cityId
    }: {
        name: string,
        codes: [],
        cityId: string
    }) {
        this.id = uuid();
        this.name = name;
        this.codes = codes;
        this.cityId = cityId;
    }
}