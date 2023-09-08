import { SellerEntity } from "../../domain/seller.entity";
import { SellerRepository } from "../../domain/seller.repository";
import { SellerModel } from "../model/seller.schema";
import UserModel from "../../../user/infrastructure/model/user.shchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export class MongoRepository implements SellerRepository {

  public async getSeller(id: string): Promise<SellerEntity | null> {
    var seller_id = (await UserModel.findOne({ "id": id })).seller_id;
    const seller: SellerEntity = await SellerModel.findOne({ _id: seller_id });
    return seller;
  }

  public async getAllSellers(pag:number): Promise<any | null> {
    const options = {
      page: pag,
      limit: 20,
      sort: { createdAt: -1 }
  }
    const sellers = await SellerModel.paginate({},options);
    return sellers;
  }

  public async createSeller(seller: SellerEntity): Promise<any | null> {
    const sellerUpdated = await SellerModel.create(seller);
    return sellerUpdated;
  }
  public async updateSeller({
    id, name, country, state, city, address, telephone, nit, postal_code, email
  }: SellerEntity): Promise<any | null> {
    var seller_id = (await UserModel.findOne({ "id": id })).seller_id;
    const sellerUpdated = await SellerModel.updateOne(
      { "_id": `${seller_id}` },
      { seller_id, name, country, state, city, address, telephone, nit, postal_code, email }
    );
    return sellerUpdated;
  }

}