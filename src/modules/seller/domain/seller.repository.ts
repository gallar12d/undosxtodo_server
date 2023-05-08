import { SellerEntity } from "./seller.entity";

export interface SellerRepository {
    getSeller(id:string):Promise<SellerEntity | null>;
    getAllSellers(pag:number):Promise<any | null>;
    createSeller(seller:SellerEntity): Promise<SellerEntity | null>;
    updateSeller(seller: SellerEntity ): Promise<SellerEntity | null>;
}