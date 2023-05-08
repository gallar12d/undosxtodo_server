import { ObjectId } from 'mongoose';

export interface DepotEntity{
    id: string;
    seller_id: ObjectId;
    state: string;
    city: string;
    name: string;
    address: string;
    status?: string;
}