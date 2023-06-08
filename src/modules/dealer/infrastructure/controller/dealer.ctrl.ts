import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { DealerService } from "../../application/DealerService";

export class DealerController {
    constructor(private dealerService: DealerService) { }

    public createDealer = async (req: Request, res: Response) => {
        try {
            res.status(200).send(await this.dealerService);
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public getDealers = async (req: Request, res: Response) => {
        try {
            res.status(200).send(await this.dealerService.getDealers());
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }
}