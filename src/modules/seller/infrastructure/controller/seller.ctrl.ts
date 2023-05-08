import { request, response } from "express";
import { SellerService } from "../../application/SellerService";
import { SellerValue } from "../../domain/seller.value";

export class SellerController {
  constructor(private sellerService: SellerService) { }

  public getSeller = async ({ token }, res) => {
    const seller = await this.sellerService.getSeller(token.id);
    res.send(seller);
  }

  public getAllSellers = async ({ params }, res) => {
    const { pag } = params
    const sellers = await this.sellerService.getAllSellers(pag);
    res.send(sellers);
  }

  public createSeller = async ({ body }, res) => {
    const { name, country, state, city, address, telephone, nit, postal_code, email } = body;

    const newSeller = new SellerValue({
      name,
      country,
      state,
      city,
      address,
      telephone,
      nit,
      postal_code,
      email
    })

    const sellerCreated = await this.sellerService.createSeller(newSeller);
    res.send(sellerCreated);
  }

  public updateSeller = async ({ body }, res) => {
    const { id, name, country, state, city, address, telephone, nit, postal_code, email } = body;
    const sellerToUpdate = { id, name, country, state, city, address, telephone, nit, postal_code, email }
    const sellerUpdated = await this.sellerService.updateSeller(sellerToUpdate);
    res.send(sellerUpdated);
  }
}