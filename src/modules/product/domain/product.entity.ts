import { ObjectId } from 'mongoose';

export interface ProductEntity{
    id: string;
    depots_ids:string[];
    sku: string;
    name: string;
    price: number;
}