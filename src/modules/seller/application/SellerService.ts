import { SellerRepository } from "../domain/seller.repository";
import { SellerValue } from "../domain/seller.value";

export class SellerService {
  constructor(private readonly sellerRepository: SellerRepository) {}

  public async getSeller(id:string) {
    const seller= await this.sellerRepository.getSeller(id);
    return seller;
  }

  public async createSeller(newSeller: SellerValue) {
    const sellerCreated = await this.sellerRepository.createSeller(newSeller);
    return sellerCreated;
  }
  
  public async updateSeller(sellerToUpdate: SellerValue) {
    const sellerUpdated = await this.sellerRepository.updateSeller(sellerToUpdate);
    return sellerUpdated;
  }
}