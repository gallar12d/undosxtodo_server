import { v4 as uuid } from "uuid";
export class DealerValue {
    constructor({ ruta99_id, name, phone_number, email, identification, role, password, rfc, driver_license, status }) {
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
