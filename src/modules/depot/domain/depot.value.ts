import { DepotEntity } from './depot.entity';
import { ObjectId } from 'mongoose';
import { v4 as uuid } from "uuid";

export class DepotValue implements DepotEntity {

    id: string;
    seller_id: ObjectId;
    ruta99_id?: number;
    name: string;
    state: string;
    city: string;
    latitude?: string;
    longitude?: string;
    address: string;
    status?: string;

    constructor({
        seller_id, ruta99_id, name, state, city, latitude, longitude, address, status
    }: {
        seller_id: ObjectId, ruta99_id?: number, name: string, state: string, city: string, address: string, latitude?: string, longitude?: string, status: string
    }) {
        this.id = uuid();
        this.seller_id = seller_id;
        this.ruta99_id = ruta99_id;
        this.name = name;
        this.state = state;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.status = status
    };
}