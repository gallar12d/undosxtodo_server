"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var StateService_1 = require("../../application/StateService");
var state_ctrl_1 = require("../controller/state.ctrl");
var mongo_repository_1 = require("../repository/mongo.repository");
var _a = require("express-validator"), body = _a.body, check = _a.check;
var router = (0, express_1.Router)();
exports.router = router;
var mongoRepository = new mongo_repository_1.MongoRepository();
var stateService = new StateService_1.StateService(mongoRepository);
var stateCtrl = new state_ctrl_1.StateController(stateService);
router.get("/states", stateCtrl.getStates);
router.post("/statesAndCities", stateCtrl.insertStatesAndCities);
router.get("/cities/:state", stateCtrl.getCities);
