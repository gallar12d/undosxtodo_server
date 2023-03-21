import { SellerEntity } from "./seller.entity";
import { v4 as uuid } from "uuid";

export class SellerValue implements SellerEntity {
    id: string;
    name:string;
    country: string;
    state: string;
    city: string;
    address: string;
    telephone: string;
    nit: string;
    postal_code: string;
    email: string;

    constructor({
        name, country, state, city, address, telephone, nit, postal_code, email
    }:{
        name: string, country: string, state: string, city: string, address: string,
        telephone:string, nit:string, postal_code:string, email:string
    }) {
        this.id = uuid();
        this.name= name;
        this.country= country;
        this.state= state;
        this.city= city;
        this.address = address;
        this.telephone= telephone;
        this.nit= nit;
        this.postal_code= postal_code;
        this.email= email.toLowerCase();
    }
} 
