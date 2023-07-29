var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
export class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
        this.findOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderService.findOrderByGuide(req.params.id);
                res.status(200).send(order);
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.getOrdersPage = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { seller_id, pag } = body;
                const orders = yield this.orderService.getOrdersPage(seller_id, pag);
                res.status(200).send(orders);
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.allOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.query.guide) {
                console.log(req.query.guide);
                try {
                    const order = yield this.orderService.findOrderByGuide(req.query.guide);
                    res.status(200).send(order);
                }
                catch (err) {
                    res.status(400).send(getErrorMessage(err));
                }
            }
            else {
                try {
                    const orders = yield this.orderService.allOrder(req.query.seller_id);
                    res.send(orders);
                }
                catch (error) {
                    res.status(401).send(getErrorMessage(error));
                }
            }
        });
        this.registerOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderService.registerOrder(req.body);
                res.json(order);
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.getSettings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const limitHour = yield this.orderService.getSettings();
                res.json(limitHour);
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.setSettings = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes } = body;
                res.json(yield this.orderService.setSettings(limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes));
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderService.updateOrder(req.params.id, req.body);
                res.send(order);
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.insertStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newStatus = yield this.orderService.insertStatus();
                res.send(newStatus);
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.updateStatus = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, guide_status } = body;
                const updatedStatus = yield this.orderService.updateStatus(id, guide_status);
                res.status(200).send(updatedStatus);
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.allOrders = ({ params }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                var { pag } = params;
                const orders = yield this.orderService.allOrders(pag);
                res.status(200).send(orders);
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.ordersDate = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { rol, date, seller_id } = body;
                if (rol === 'superuser') {
                    const ordersDate = yield this.orderService.ordersDate(rol, date, '');
                    res.status(200).send(ordersDate);
                }
                else if (rol === 'admin') {
                    const ordersDate = yield this.orderService.ordersDate(rol, date, seller_id);
                    res.status(200).send(ordersDate);
                }
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.authR99 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(yield this.orderService.authR99());
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.createScenario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newScenario = yield this.orderService.createScenario();
                res.json(newScenario);
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.deleteScenario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // res.json(await this.orderService);
                res.json({ m: "Eliminando escenario" });
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.orderReports = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { start, ending, seller_id, rol } = body;
                res.send(yield this.orderService.orderReports(start, ending, seller_id, rol));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.recentOrders = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { rol, seller_id } = body;
                res.send(yield this.orderService.recentOrders(rol, seller_id));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.orderTraceability = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, status } = body;
                res.status(200).json(yield this.orderService.orderTraceability(code, status));
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
    }
}
