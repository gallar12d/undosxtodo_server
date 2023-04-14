import { request, response } from "express";
import { DepotService } from "../../application/DepotService";
import { DepotValue } from "../../domain/depot.value";

export class DepotController {
  constructor(private depotService: DepotService) {}

  public insertDepot= async ({body}, res) =>{
    const {seller_id, name, state, city, address}= body;

    const newDepot=new DepotValue({
      seller_id, name, state, city, address
    })

    const insertedDepot= await this.depotService.insertDepot(newDepot);
    res.send(insertedDepot);
  }

  public getDepots= async ({body}, res) =>{
    const {seller_id}=body;
    const depots= await this.depotService.getDepots(seller_id);
    res.send(depots);
  }

  public updateDepot= async ({body},res)=>{
    const { id, seller_id, name, state, city, address }= body;
    const depot={id, seller_id, name, state, city, address};
    const updatedDepot= await this.depotService.updateDepot(depot);
    res.send(updatedDepot);
  }

  public deleteDepot= async (req,res)=>{
    const {id}= req.params;
    const depotDeleted = await this.depotService.deleteDepot(id);
    res.send(depotDeleted);
  }

  public allDepots= async (req, res)=>{
    const {pag}= req.params;
    const depots= await this.depotService.allDepots(pag);
    res.send(depots);
  }
}