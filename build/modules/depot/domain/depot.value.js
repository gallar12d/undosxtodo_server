import { v4 as uuid } from "uuid";
export class DepotValue {
    constructor({ seller_id, ruta99_id, name, state, city, latitude, longitude, address, status }) {
        this.id = uuid();
        this.seller_id = seller_id;
        this.ruta99_id = ruta99_id;
        this.name = name;
        this.state = state;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.status = status;
    }
    ;
}
