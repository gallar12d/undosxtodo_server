import { ProductRepository } from "../domain/product.repository";
import { ProductValue } from "../domain/product.value";

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  public async insertProduct(newProduct: ProductValue){
    const insertedProduct = await this.productRepository.insertProduct(newProduct);
    return insertedProduct;
  }

  public async getProducts(depots_ids:any){
    const products = await this.productRepository.getProducts(depots_ids);
    return products;
  }

  public async getProductsPage(depots_ids:any, pag){
    const products = await this.productRepository.getProductsPage(depots_ids,pag);
    return products;
  }
  
  public async updateProduct(productToUpdate:any){
    const updatedProduct = await this.productRepository.updateProduct(productToUpdate);
    return updatedProduct;
  }

  public async deleteProduct(_id:any){
    const deletedProduct = await this.productRepository.deleteProduct(_id);
    return deletedProduct;
  }

  public async allProducts(pag:any){
    const products = await this.productRepository.allProducts(pag);
    return products;
  }
}