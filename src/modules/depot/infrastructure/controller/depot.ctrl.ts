import { request, response } from "express";
import { DepotService } from "../../application/DepotService";
import { DepotValue } from "../../domain/depot.value";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";

export class DepotController {
  constructor(private depotService: DepotService) { }

  public insertDepot = async ({ body }, res) => {
    try {
      const { seller_id, name, state, city, latitude, longitude, address, status } = body;

      const newDepot = new DepotValue({
        seller_id, name, state, city, latitude, longitude, address, status
      })

      const insertedDepot = await this.depotService.insertDepot(newDepot);
      res.send(insertedDepot);
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public getDepots = async ({ body }, res) => {
    const { seller_id } = body;
    const depots = await this.depotService.getDepots(seller_id);
    res.send(depots);
  }

  public getDepotsPage = async ({ body }, res) => {
    const { seller_id, pag } = body;
    const depots = await this.depotService.getDepotsPage(seller_id, pag);
    res.send(depots);
  }

  public updateDepot = async ({ body }, res) => {
    try {
      const updatedDepot = await this.depotService.updateDepot(body);
      res.send(updatedDepot);
    } catch (err) {
      // console.log(err.response.data);
      err.message = err.response.data.errors || err.response.data.message;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public deleteDepot = async (req, res) => {
    try {
      const { id } = req.params;
      const depotDeleted = await this.depotService.deleteDepot(id);
      res.send(depotDeleted);
    } catch (err) {
      err.message = err.response.data.errors;
      res.status(400).json(getErrorMessage(err));
    }
  }

  public allDepots = async (req, res) => {
    const { pag } = req.params;
    const depots = await this.depotService.allDepots(pag);
    res.send(depots);
  }
}