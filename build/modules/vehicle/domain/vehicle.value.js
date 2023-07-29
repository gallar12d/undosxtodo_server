import { v4 as uuid } from "uuid";
export class VehicleValue {
    constructor({ dealer_id, code, zone_id, ruta99_id, capacity, name, phone, email, description, depot_id, picture, vehicle_type, status, availability }) {
        this.id = uuid();
        this.dealer_id = dealer_id;
        this.zone_id = zone_id;
        this.ruta99_id = ruta99_id;
        this.code = code;
        this.capacity = capacity;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.description = description;
        this.depot_id = depot_id;
        this.picture = picture;
        this.vehicle_type = vehicle_type;
        this.status = status;
        this.availability = availability;
    }
}
