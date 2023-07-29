import { v4 as uuid } from "uuid";
export class OrderValue {
    constructor({ scenario_id, ruta99_id, depot_name, depot_id, guide, guide_status, seller_id, seller_address, seller_city, seller_state, seller_telephone, seller_nit, seller_postal_code, seller_country, seller_email, client_name, client_surname, client_email, client_address, latitude, longitude, client_address_detail, client_city, client_state, client_telephone, products, client_country, value_to_collect, }) {
        this.id = uuid();
        this.scenario_id = scenario_id;
        this.ruta99_id = ruta99_id;
        this.depot_id = depot_id;
        this.depot_name = depot_name;
        this.guide = guide;
        this.guide_status = guide_status;
        this.seller_id = seller_id;
        this.seller_address = seller_address;
        this.seller_city = seller_city;
        this.seller_state = seller_state;
        this.seller_telephone = seller_telephone;
        this.seller_nit = seller_nit;
        this.seller_postal_code = seller_postal_code;
        this.seller_country = seller_country;
        this.seller_email = seller_email;
        this.client_name = client_name;
        this.client_surname = client_surname;
        this.client_email = client_email;
        this.client_address = client_address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.client_address_detail = client_address_detail;
        this.client_city = client_city;
        this.client_state = client_state;
        this.client_telephone = client_telephone;
        this.products = products;
        this.client_country = client_country;
        this.value_to_collect = value_to_collect;
    }
}
