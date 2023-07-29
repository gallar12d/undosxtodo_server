import { v4 as uuid } from "uuid";
export class UserValue {
    constructor({ seller_id, name, email, password, rol, status }) {
        this.encript = (encriptedPaswword) => {
            this.password = encriptedPaswword;
        };
        this.id = uuid();
        this.seller_id = seller_id;
        this.name = name;
        this.email = email.toLowerCase();
        this.password = password;
        this.rol = rol;
        this.status = status;
    }
}
