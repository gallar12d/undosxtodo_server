import { ProductEntity } from './product.entity';
import { ObjectId } from 'mongoose';
import { v4 as uuid } from "uuid";

export class ProductValue implements ProductEntity {

    id: string;
    depots_ids:string[];
    sku: string;
    name: string;
    price: number;

    constructor( {
        depots_ids, sku, name, price
    }:{
        depots_ids:string[], sku: string, name: string, price: number
    } ){
        this.id= uuid();
        this.depots_ids= depots_ids;
        this.sku= sku;
        this.name= name;
        this.price= price;
    };
}