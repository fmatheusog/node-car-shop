import { model as MongooseModel } from 'mongoose';
import GenericModel from './generic.model';
import carSchema from '../schemas/car.schema';
import { Car } from '../interfaces/CarInterface';

export default class CarModel extends GenericModel<Car> {
  constructor(model = MongooseModel('car', carSchema)) {
    super(model);
  }
}
