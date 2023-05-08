import { Router } from "express";
import { SellerService } from "../../application/SellerService";
import { SellerController } from "../controller/seller.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";
// import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";
const { body, check } = require("express-validator");

const router = Router();

const mongoRepository = new MongoRepository();
const sellerService = new SellerService(mongoRepository);
const sellerCtrl = new SellerController(sellerService);
router.post(`/seller`,sellerCtrl.createSeller);
router.get(`/seller`,authMiddleware,sellerCtrl.getSeller);
router.get(`/sellers/:pag`,authMiddleware,sellerCtrl.getAllSellers);
router.put(`/seller`, body("email").isEmail(),sellerCtrl.updateSeller);

export { router };