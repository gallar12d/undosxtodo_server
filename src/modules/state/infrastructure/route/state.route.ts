import { Router } from "express";
import { StateService } from "../../application/StateService";
import { StateController } from "../controller/state.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";
const { body, check } = require("express-validator");

const router = Router();

const mongoRepository = new MongoRepository();
const stateService = new StateService(mongoRepository);
const stateCtrl = new StateController(stateService);
router.get(`/states`,stateCtrl.getStates);
router.post(`/statesAndCities`, stateCtrl.insertStatesAndCities);
router.get(`/cities/:state`, stateCtrl.getCities);

export { router };