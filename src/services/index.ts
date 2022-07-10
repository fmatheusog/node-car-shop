import { ZodError } from 'zod';
import GenericModel from '../models/generic.model';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(protected model: GenericModel<T>) { }

  public async create(entity: T): Promise<T | null | ServiceError> {
    return this.model.create(entity);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, entity: T): Promise<T | null | ServiceError> {
    return this.model.update(id, entity);
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}

export default Service;