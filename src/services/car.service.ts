import { Car, carSchema } from '../interfaces/CarInterface';
import CarModel from '../models/car.model';
import Service, { ServiceError } from '.';

const NOT_FOUND_ERROR_MESSAGE = 'car not found';

export default class ClassService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  async create(entity: Car) {
    const validation = carSchema.safeParse(entity);
    if (!validation.success) {
      return { error: validation.error };
    }

    return this.model.create(entity);
  }

  async update(id: string, entity: Car): Promise<Car | ServiceError | null> {
    const validation = carSchema.safeParse(entity);
    if (!validation.success) {
      return { error: validation.error };
    }

    const car = this.model.update(id, entity);

    if (!car) throw new Error(NOT_FOUND_ERROR_MESSAGE);
    return car;
  }

  async read() {
    return this.model.read();
  }

  async readOne(id: string) {
    if (id.length < 24) return null;
    
    const car = await this.model.readOne(id);

    if (!car) throw new Error(NOT_FOUND_ERROR_MESSAGE);
    return car;
  }

  async delete(id: string): Promise<Car | null> {
    if (id.length < 24) return null;
    
    const car = await this.model.delete(id);

    if (!car) throw new Error(NOT_FOUND_ERROR_MESSAGE);
    return car;
  }
}
