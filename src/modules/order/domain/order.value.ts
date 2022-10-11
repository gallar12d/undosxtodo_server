import { v4 as uuid } from "uuid";
import { OrderEntity } from "./order.entity";

export class OrderValue implements OrderEntity {
  id: string;
  winery_name: string;
  guide: number;
  guide_status: string;
  seller_address: string;
  seller_city: string;
  seller_state: string;
  seller_telephone: number;
  seller_nit: string;
  seller_postal_code: string;
  seller_country: string;
  seller_email: string;
  //client information
  client_name: string;
  client_surname: string;
  client_address: string;
  client_city: string;
  client_state: string;
  client_telephone: number;
  products: object[];
  client_country: string;
  value_to_collect: number;

  constructor({
    winery_name,
    guide,
    guide_status,
    seller_address,
    seller_city,
    seller_state,
    seller_telephone,
    seller_nit,
    seller_postal_code,
    seller_country,
    seller_email,
    client_name,
    client_surname,
    client_address,
    client_city,
    client_state,
    client_telephone,
    products,
    client_country,
    value_to_collect,
  }: {
    winery_name: string;
    guide: number;
    guide_status: string;
    seller_address: string;
    seller_city: string;
    seller_state: string;
    seller_telephone: number;
    seller_nit: string;
    seller_postal_code: string;
    seller_country: string;
    seller_email: string;
    //client information
    client_name: string;
    client_surname: string;
    client_address: string;
    client_city: string;
    client_state: string;
    client_telephone: number;
    products: object[];
    client_country: string;
    value_to_collect: number;
  }) {
    this.id = uuid();
    this.winery_name = winery_name;
    this.guide = guide;
    this.guide_status = guide_status;
    this.seller_address = seller_address;
    this.seller_city = seller_city;
    this.seller_state = seller_state;
    this.seller_telephone = seller_telephone;
    this.seller_nit = seller_nit;
    this.seller_postal_code = seller_postal_code;
    this.seller_country = seller_country;
    this.seller_email = seller_email
    this.client_name = client_name;
    this.client_surname = client_surname;
    this.client_address = client_address;
    this.client_city = client_city;
    this.client_state = client_state;
    this.client_telephone = client_telephone;
    this.products = products;
    this.client_country = client_country;
    this.value_to_collect = value_to_collect;
  }
}
