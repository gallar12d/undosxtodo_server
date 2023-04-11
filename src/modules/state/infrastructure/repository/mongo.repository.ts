import { StateEntity } from "../../domain/state.entity";
import { StateRepository } from "../../domain/state.repository";
import StateModel from "../model/state.schema";
import {states} from '../../../state/infrastructure/db/states';
import {cities} from '../db/cities';
import CityModel from '../model/city.schema'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { StateValue } from "../../domain/state.value";

export class MongoRepository implements StateRepository {


  public async getStates(): Promise<StateEntity[] | null> {
    const states: StateEntity[] = await StateModel.find();
    states.sort( (a, b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    } );
    return states;
  }

  public async insertStatesAndCities(): Promise<Object[] | null> {
    await StateModel.insertMany(states);
    await CityModel.insertMany(cities);
    return [];
  }

  public async getCities(stateName:string): Promise<Object[] | null> {
    const resultState:any= await StateModel.find({name:stateName});
    const cities = await CityModel.find({state_id:resultState[0].id});
    cities.sort( (a, b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    } );
    return cities;
  }
}