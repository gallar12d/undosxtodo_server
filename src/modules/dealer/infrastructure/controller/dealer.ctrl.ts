import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { DealerService } from "../../application/DealerService";
import { DealerValue } from "../../domain/dealer.value";

export class DealerController {
    constructor(private dealerService: DealerService) { }

    public createDealer = async ({ body }: Request, res: Response) => {
        try {
            const { seller_id, ruta99_id, shipday_id, name, phone_number, email, identification, role, password, rfc, driver_license, status, platform } = body;
            const newDealer = new DealerValue({
                seller_id, ruta99_id, shipday_id, name, phone_number, email, identification, role, password, rfc, driver_license, status, platform
            });
            res.status(200).json(await this.dealerService.createDealer(newDealer));
        } catch (err) {
            err.message = err.response.data.errors;
            res.status(400).json(getErrorMessage(err));
        }
    }

    public changeStatus = async ({ body }: Request, res: Response) => {
        try {
            const { dealer_id, status } = body;
            res.status(200).json(await this.dealerService.changeStatus(dealer_id, status));
        } catch (err) {
            res.status(400).json(getErrorMessage(err));
        }
    }

    public getDealers = async (req: Request, res: Response) => {
        try {
            res.status(200).json(await this.dealerService.getDealers());
        } catch (err) {
            res.status(400).json(getErrorMessage(err));
        }
    }
}