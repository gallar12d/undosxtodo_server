export interface VehicleEntity {
    id: string,
    dealer_id: string,
    zone_id: string,
    ruta99_id?: number,
    code: string,
    capacity: string,
    name: string,
    phone?: string,
    email?: string,
    description?: string,
    depot_id?: string,
    picture?: string,
    vehicle_type?: string,
    status: string,
    availability?: string;
}