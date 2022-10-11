
export interface OrderEntity {
  id: string; 
  winery_name?: string;
  guide: number;
  guide_status?: string;
  seller_address?: string;
  seller_city?: string;
  seller_state?: string;
  seller_telephone?: number;
  seller_nit?: string;
  seller_postal_code?: string;
  seller_country?: string;
  seller_email?: string;
  //client information
  client_name?: string;
  client_surname?: string;
  client_address?: string;
  client_city?: string;
  client_state?: string;
  client_telephone?: number;
  products?: object[];
  client_country?: string;
  value_to_collect?: number
}
