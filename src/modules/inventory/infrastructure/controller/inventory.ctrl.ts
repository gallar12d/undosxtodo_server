import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { InventoryService } from "../../application/InventoryService";
import { InventoryEntity } from "../../domain/inventory.entity";
import { InventoryValue } from "../../domain/inventory.value";

export class InventoryController {
    constructor(private inventoryService: InventoryService) { }

    public createInventoryObj = async ({ body }: Request, res: Response) => {
        try {
            const { seller_id, product_id, quantity, location, depot_id, income_type, history } = body;
            const myInventory: InventoryEntity = new InventoryValue({ seller_id, product_id, quantity, depot_id, income_type, history });
            res.status(200).send(await this.inventoryService.createInventoryObj(myInventory));
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public editInventoryObj = async ({ body }: Request, res: Response) => {
        try {
            const { seller_id, product_id, quantity, location, depot_id, income_type, queryId } = body;
            const inventoryObj: InventoryEntity = new InventoryValue({ seller_id, product_id, quantity, depot_id, income_type });
            res.status(200).send(await this.inventoryService.editInventoryObj(inventoryObj, queryId));
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public getInventory = async (req: Request, res: Response) => {
        try {
            res.status(200).send(await this.inventoryService.getInventory());
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public getRelatedDepots = async ({ body }: Request, res: Response) => {
        try {
            const { seller_id } = body;
            res.status(200).send(await this.inventoryService.getRelatedDepots(seller_id));
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public getProducts = async ({ body }: Request, res: Response) => {
        try {
            const { depot_id } = body;
            res.status(200).send(await this.inventoryService.getProducts(depot_id));
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public subtractAmount = async ({ body }: Request, res: Response) => {
        try {
            const { product_ids, depot_id, date, transacction_type } = body;
            res.status(200).send(await this.inventoryService.subtractAmount(product_ids, depot_id, date, transacction_type));
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }
}