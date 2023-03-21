import { StateRepository } from "../domain/state.repository";
import { StateValue } from "../domain/state.value";

export class StateService {
  constructor(private readonly stateRepository: StateRepository) { }

  public async getStates() {
    const states = await this.stateRepository.getStates();
    return states;
  }

  public async insertStatesAndCities() {
    const insertedStates = this.stateRepository.insertStatesAndCities();
    return insertedStates;
  }

  public async getCities(stateName:string) {
    const cities = this.stateRepository.getCities(stateName);
    return cities;
  }

}