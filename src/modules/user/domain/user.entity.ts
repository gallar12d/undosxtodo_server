import { ObjectId } from 'mongoose';
import {SellerEntity} from '../../seller/domain/seller.entity'

interface ProductEntity{
    id: string;
    bodegas_id:[
        
    ];
    sku: string;
    name: string;
    price: string;
}

// interface DepotProductEntity{
//     id: string;
//     depot_id: DepotEntity;
//     product_id: ProductEntity;
// }

interface DepotEntity{
    id: string;
    seller_id: SellerEntity;
    name: string;
    address: string;
    state: string;
    city: string;
}

export interface UserEntity {
    id: string;
    seller_id: ObjectId;
    name: string;
    email: string;
    password: string;
    rol: string;
    token?: string;
}