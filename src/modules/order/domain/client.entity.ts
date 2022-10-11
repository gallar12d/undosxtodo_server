interface ProductEntity{
    name: string;
    quantity: number;

}

export interface ClientEntity {
  id: string;
  name: string;
  surmane: string;
  address: string;
  city: string;
  state: string;
  telephone: string;
  products: ProductEntity[];
  country: string;
  value_to_collect: number
}
