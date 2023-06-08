import { request, response } from "express";
import { ProductValue } from "../../domain/product.value";
import { ProductService } from "../../application/ProductService";

export class ProductController {
  constructor(private productService: ProductService) { }

  public insertProduct = async ({ body }, res) => {
    const { depots, sku, name, price, status, inventory_id } = body;
    const arrayDepots = JSON.parse(depots);
    const depots_ids: string[] = [];
    arrayDepots.forEach((depot: any) => {
      depots_ids.push(depot._id);
    });

    const newProduct = new ProductValue({ depots_ids, sku, name, price, status, inventory_id });

    const insertedProduct = await this.productService.insertProduct(newProduct);
    // res.send(insertedProduct);
    res.json({data: insertedProduct});
  }

  public getProducts = async ({ body }, res) => {
    const { depots } = body;
    const arrayDepots = JSON.parse(depots);
    const products = await this.productService.getProducts(arrayDepots);
    res.send(products);
  }

  public getProductsPage = async ({ body }, res) => {
    const { depots, pag } = body;
    const arrayDepots = JSON.parse(depots);
    const products = await this.productService.getProductsPage(arrayDepots, pag);
    res.send(products);
  }

  public updateProduct = async ({ body }, res: any) => {
    var { _id, id, depots_string, sku, name, price, status } = body;
    const depots_ids = JSON.parse(depots_string);
    const productToUpdate = { _id, id, depots_ids, sku, name, price, status };
    const updatedProduct = await this.productService.updateProduct(productToUpdate);
    res.send(updatedProduct);
  }

  public deleteProduct = async ({ params }, res: any) => {
    var { _id } = params;

    const deletedProduct = await this.productService.deleteProduct(_id);
    res.send(deletedProduct);
  }

  public allProducts = async ({ params }, res: any) => {
    var { pag } = params;
    const products = await this.productService.allProducts(pag);
    res.send(products);
  }
}