import { v4 as uuid } from "uuid";
export class ZoneValue {
    constructor({ name, codes, cityId }) {
        this.id = uuid();
        this.name = name;
        this.codes = codes;
        this.cityId = cityId;
    }
}
