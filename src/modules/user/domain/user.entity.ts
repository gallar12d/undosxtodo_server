import { ObjectId } from 'mongoose';

export interface UserEntity {
    id: string;
    seller_id: ObjectId;
    name: string;
    email: string;
    password: string;
    rol: string;
    token?: string;
    status?: string;
}