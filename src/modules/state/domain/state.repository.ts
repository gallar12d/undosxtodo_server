import { StateEntity } from "./state.entity";

export interface StateRepository {
    getStates():Promise<StateEntity[] | null>;
    insertStatesAndCities():Promise<any| null>;
    getCities(state: string):Promise<Object[] | null>;
}