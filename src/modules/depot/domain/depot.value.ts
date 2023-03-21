import {DepotEntity} from './depot.entity';
import { ObjectId } from 'mongoose';
import { v4 as uuid } from "uuid";

export class DepotValue implements DepotEntity {

    id: string;
    seller_id: ObjectId;
    name: string;
    state: string;
    city: string;
    address: string;

    constructor( {
        seller_id, name, state, city, address
    }:{
        seller_id: ObjectId, name: string, state: string, city: string, address: string
    } ){
        this.id= uuid();
        this.seller_id= seller_id;
        this.name= name;
        this.state= state;
        this.city= city;
        this.address= address;
    };
}