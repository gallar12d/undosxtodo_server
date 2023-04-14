import { DepotRepository } from "../domain/depot.repository";
import { DepotValue } from "../domain/depot.value";

export class DepotService {
  constructor(private readonly depotRepository: DepotRepository) { }

  public async insertDepot(depot: DepotValue) {
    const insertedDepot= await this.depotRepository.insertDepot(depot);
    return insertedDepot;
  }

  public async getDepots(seller_id:string) {
    const depots = await this.depotRepository.getDepots(seller_id);
    return depots;
  }

  public async updateDepot(depot : DepotValue){
    const updatedDepot = await this.depotRepository.updateDepot(depot);
    return updatedDepot;
  }

  public async deleteDepot(id : string){
    const deletedDepot = await this.depotRepository.deleteDepot(id);
    return deletedDepot;
  }

  public async allDepots(pag:number){
    const depots = await this.depotRepository.allDepots(pag);
    return depots;
  }
}