import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { ZoneService } from "../../application/ZoneService";

export class ZoneController {
    constructor(private zoneService: ZoneService) { }

    public setDefaultZones = async (req: Request, res: Response) => {
        try {
            res.status(200).send(await this.zoneService.setDefaultZones());
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public createZone = async ({ body }: Request, res: Response) => {
        try {
            const { name, codes } = body;
            const arrayCodes = codes.map((objeto: any) => objeto.value);
            res.status(200).send(await this.zoneService.createZone(name, arrayCodes));
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public getZones = async (req: Request, res: Response) => {
        try {
            res.status(200).send(await this.zoneService.getZones());
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }

    public setZone = async ({ body }: Request, res: Response) => {
        try {
            const { oldName, name, codes } = body;
            const arrayCodes = codes.map((objeto: any) => objeto.value);
            res.status(200).send(await this.zoneService.setZone(oldName, name, arrayCodes));
        } catch (err) {
            res.status(400).send(getErrorMessage(err));
        }
    }
}