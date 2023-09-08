export interface DealerEntity {
    id: string;
    seller_id?: string;
    ruta99_id?: number;
    shipday_id?: number;
    name: string;
    phone_number?: string;
    email: string;
    identification?: number;
    role: string;
    password: string;
    rfc?: string;
    driver_license?: string;
    status: string;
    platform: string;
}