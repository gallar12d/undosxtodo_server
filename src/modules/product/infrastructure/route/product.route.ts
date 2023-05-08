import { Router } from "express";
import { ProductService } from "../../application/ProductService";
import { ProductController } from "../controller/product.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";
// const { body, check } = require("express-validator");

const router = Router();

const mongoRepository = new MongoRepository();
const productService = new ProductService(mongoRepository);
const productCtrl = new ProductController(productService);
router.post(`/product`, productCtrl.insertProduct);
router.post(`/products`, productCtrl.getProducts);
router.post(`/productsPage`, productCtrl.getProductsPage);
router.put(`/product`, productCtrl.updateProduct);
router.delete(`/product/:_id`, productCtrl.deleteProduct);
router.get(`/products/:pag`, authMiddleware, productCtrl.allProducts);

export { router };