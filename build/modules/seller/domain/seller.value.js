import { v4 as uuid } from "uuid";
export class SellerValue {
    constructor({ name, country, state, city, address, telephone, nit, postal_code, email }) {
        this.id = uuid();
        this.name = name;
        this.country = country;
        this.state = state;
        this.city = city;
        this.address = address;
        this.telephone = telephone;
        this.nit = nit;
        this.postal_code = postal_code;
        this.email = email.toLowerCase();
    }
}
