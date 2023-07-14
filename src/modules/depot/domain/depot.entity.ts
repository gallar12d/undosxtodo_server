import { ObjectId } from 'mongoose';

export interface DepotEntity{
    id: string;
    seller_id: ObjectId;
    ruta99_id?:number;
    state: string;
    city: string;
    name: string;
    latitude?: string;
    longitude?: string;
    address: string;
    status?: string;
}