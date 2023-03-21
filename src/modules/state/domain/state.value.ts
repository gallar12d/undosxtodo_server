import { StateEntity } from './state.entity';

export class StateValue implements StateEntity {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}