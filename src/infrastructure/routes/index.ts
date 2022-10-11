import { Router } from "express";
import { router as userRoutes } from "../../modules/user/infrastructure/route/user.route";
import { router as authRoutes } from "../../modules/auth/infrastructure/route/auth.route";
import { router as orderRoutes } from "../../modules/order/infrastructure/route/order.route";


const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(orderRoutes);


export { router };
