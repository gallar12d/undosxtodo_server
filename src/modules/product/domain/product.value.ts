import { ProductEntity } from './product.entity';
import { ObjectId } from 'mongoose';
import { v4 as uuid } from "uuid";

export class ProductValue implements ProductEntity {

    id: string;
    depots_ids:string[];
    sku: string;
    name: string;
    price: number;
    status?: string;
    inventory_id?: [];

    constructor( {
        depots_ids, sku, name, price, status, inventory_id
    }:{
        depots_ids:string[], sku: string, name: string, price: number, status?: string, inventory_id?: []
    } ){
        this.id= uuid();
        this.depots_ids= depots_ids;
        this.sku= sku;
        this.name= name;
        this.price= price;
        this.status= status;
        this.inventory_id= inventory_id;
    };
}