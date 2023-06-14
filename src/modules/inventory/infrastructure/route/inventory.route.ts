import { Router } from "express";
import { InventoryService } from "../../application/InventoryService";
import { InventoryController } from "../controller/inventory.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const inventoryService = new InventoryService(mongoRepository);
const inventoryCtrl = new InventoryController(inventoryService);

router.post(`/createInventoryObj`, authMiddleware, inventoryCtrl.createInventoryObj);
router.get(`/getInventory`, authMiddleware, inventoryCtrl.getInventory);
router.post(`/editInventoryObj`, authMiddleware, inventoryCtrl.editInventoryObj);
router.post(`/getRelatedDepots`, authMiddleware, inventoryCtrl.getRelatedDepots);
router.get(`/getRelatedSellers/:pag`, authMiddleware, inventoryCtrl.getRelatedSellers);
router.put(`/setInventoryStatus`, authMiddleware, inventoryCtrl.setInventoryStatus);
router.post(`/getProducts`, authMiddleware, inventoryCtrl.getProducts);
router.post(`/subtractAmount`, authMiddleware, inventoryCtrl.subtractAmount);

export { router };