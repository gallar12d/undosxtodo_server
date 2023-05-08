import { ProductValue } from "./product.value";

export interface ProductRepository {
    insertProduct(newProduct: ProductValue):Promise<any | null>;
    getProducts(depots_ids:any):Promise<any | null>;
    getProductsPage(depots_ids:any, pag: number):Promise<any | null>;
    updateProduct(productToUpdate: any):Promise<any | null>;
    deleteProduct(_id: any):Promise<any | null>;
    allProducts(pag: any):Promise<any | null>;
}