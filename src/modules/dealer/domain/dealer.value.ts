import { v4 as uuid } from "uuid";
import { DealerEntity } from "./dealer.entity";

export class DealerValue implements DealerEntity {
    id: string;
    ruta99_id?: number;
    name: string;
    phone_number?: string;
    email: string;
    identification?: number;
    role: string;
    password: string;
    rfc?: string;
    driver_license?: string;
    status: string;

    constructor({
        ruta99_id,
        name,
        phone_number,
        email,
        identification,
        role,
        password,
        rfc,
        driver_license,
        status
    }: {
        ruta99_id: number;
        name: string;
        phone_number?: string;
        email: string;
        identification?: number;
        role: string;
        password: string;
        rfc?: string;
        driver_license?: string;
        status: string;
    }) {
        this.id = uuid();
        this.ruta99_id = ruta99_id;
        this.name = name;
        this.phone_number = phone_number;
        this.email = email;
        this.identification = identification;
        this.role = role;
        this.password = password;
        this.rfc = rfc;
        this.driver_license = driver_license;
        this.status = status;
    }
}