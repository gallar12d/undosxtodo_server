import { v4 as uuid } from "uuid";
import { VehicleEntity } from "./vehicle.entity";

export class VehicleValue implements VehicleEntity {
    id: string;
    dealer_id: string;
    zone_id: string;
    ruta99_id?: number;
    code: string;
    capacity: string;
    name: string;
    phone?: string;
    email?: string;
    description?: string;
    depot_id?: string;
    picture?: string;
    vehicle_type?: string;
    status: string;
    availability?: string;

    constructor({
        dealer_id,
        code,
        zone_id,
        ruta99_id,
        capacity,
        name,
        phone,
        email,
        description,
        depot_id,
        picture,
        vehicle_type,
        status,
        availability
    }: {
        dealer_id: string,
        code: string;
        zone_id: string;
        ruta99_id?: number;
        capacity: string;
        name: string;
        phone?: string;
        email?: string;
        description?: string;
        depot_id?: string;
        picture?: string;
        vehicle_type?: string;
        status: string;
        availability?: string;
    }) {
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