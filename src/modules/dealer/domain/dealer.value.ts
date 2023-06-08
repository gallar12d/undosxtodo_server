import { v4 as uuid } from "uuid";
import { DealerEntity } from "./dealer.entity";

export class DealerValue implements DealerEntity {
    id: string;
    name: string;
    code: string;
    capacity: number;
    email: string;
    depot_ids: [];

    constructor({
        name,
        code,
        capacity,
        email,
        depot_ids,
    }: {
        name: string;
        code: string;
        capacity: number;
        email: string;
        depot_ids: [];
    }) {
        this.id = uuid();
        this.name = name;
        this.code = code;
        this.capacity = capacity;
        this.email = email;
        this.depot_ids = depot_ids;
    }
}