var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProductValue } from "../../domain/product.value";
export class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.insertProduct = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { depots, sku, name, price, status, inventory_id } = body;
            const arrayDepots = JSON.parse(depots);
            const depots_ids = [];
            arrayDepots.forEach((depot) => {
                depots_ids.push(depot._id);
            });
            const newProduct = new ProductValue({ depots_ids, sku, name, price, status, inventory_id });
            const insertedProduct = yield this.productService.insertProduct(newProduct);
            // res.send(insertedProduct);
            res.json({ data: insertedProduct });
        });
        this.getProducts = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { depots } = body;
            const arrayDepots = JSON.parse(depots);
            const products = yield this.productService.getProducts(arrayDepots);
            res.send(products);
        });
        this.getProductsPage = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { depots, pag } = body;
            const arrayDepots = JSON.parse(depots);
            const products = yield this.productService.getProductsPage(arrayDepots, pag);
            res.send(products);
        });
        this.updateProduct = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            var { _id, id, depots_string, sku, name, price, status } = body;
            const depots_ids = JSON.parse(depots_string);
            const productToUpdate = { _id, id, depots_ids, sku, name, price, status };
            const updatedProduct = yield this.productService.updateProduct(productToUpdate);
            res.send(updatedProduct);
        });
        this.deleteProduct = ({ params }, res) => __awaiter(this, void 0, void 0, function* () {
            var { _id } = params;
            const deletedProduct = yield this.productService.deleteProduct(_id);
            res.send(deletedProduct);
        });
        this.allProducts = ({ params }, res) => __awaiter(this, void 0, void 0, function* () {
            var { pag } = params;
            const products = yield this.productService.allProducts(pag);
            res.send(products);
        });
    }
}
