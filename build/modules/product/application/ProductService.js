var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    insertProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedProduct = yield this.productRepository.insertProduct(newProduct);
            return insertedProduct;
        });
    }
    getProducts(depots_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.getProducts(depots_ids);
            return products;
        });
    }
    getProductsPage(depots_ids, pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.getProductsPage(depots_ids, pag);
            return products;
        });
    }
    updateProduct(productToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this.productRepository.updateProduct(productToUpdate);
            return updatedProduct;
        });
    }
    deleteProduct(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield this.productRepository.deleteProduct(_id);
            return deletedProduct;
        });
    }
    allProducts(pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.allProducts(pag);
            return products;
        });
    }
}
