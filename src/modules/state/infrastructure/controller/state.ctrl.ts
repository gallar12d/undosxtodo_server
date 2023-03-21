import { request, response } from "express";
import { StateService } from "../../application/StateService";
import { StateValue } from "../../domain/state.value";

export class StateController {
  constructor(private stateService: StateService) {}

  public getStates= async (req,res) => {
    const states= await this.stateService.getStates();
    res.send(states)
  }

  public insertStatesAndCities= async (req,res) => {
    const insertedStates= this.stateService.insertStatesAndCities();
    res.send(insertedStates);
  }

  public getCities= async ({params}, res) => {
    const {state}= params;
    const cities= await this.stateService.getCities(state);
    res.send(cities);
  }
}