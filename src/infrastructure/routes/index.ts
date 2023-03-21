import { Router } from "express";
import { router as userRoutes } from "../../modules/user/infrastructure/route/user.route";
import { router as authRoutes } from "../../modules/auth/infrastructure/route/auth.route";
import { router as orderRoutes } from "../../modules/order/infrastructure/route/order.route";
import { router as sellerRoutes } from "../../modules/seller/infrastructure/route/seller.route";
import { router as stateRoutes } from "../../modules/state/infrastructure/route/state.route";
import { router as depotRoutes } from "../../modules/depot/infrastructure/route/depot.route";
import { router as productRoutes } from "../../modules/product/infrastructure/route/product.route";


const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(orderRoutes);
router.use(sellerRoutes);
router.use(stateRoutes);
router.use(depotRoutes);
router.use(productRoutes);

export { router };
