import { Car, carSchema } from '../interfaces/CarInterface';
import CarModel from '../models/car.model';
import Service, { ServiceError } from '.';

const ID_LENGHT_ERROR = 'Id must have 24 hexadecimal characters';

export default class CarService extends Service<Car> {
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
    if (id.length < 24) throw new Error(ID_LENGHT_ERROR);

    const validation = carSchema.safeParse(entity);
    if (!validation.success) {
      return { error: validation.error };
    }

    const car = this.model.update(id, entity);

    if (!car) return null;
    return car;
  }

  async read(): Promise<Car[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<Car | null> {
    if (id.length < 24) throw new Error(ID_LENGHT_ERROR);
    
    const car = await this.model.readOne(id);

    if (!car) return null;
    return car;
  }

  async delete(id: string): Promise<Car | null> {
    if (id.length < 24) throw new Error(ID_LENGHT_ERROR);
    
    const car = await this.model.delete(id);

    if (!car) return null;
    return car;
  }
}
