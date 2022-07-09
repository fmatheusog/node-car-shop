import { Model as M, isValidObjectId } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class GenericModel<T> implements Model<T> {
  constructor(
    protected _mongooseModel: M<T>,
  ) {}

  async create(entity: T): Promise<T> {
    return this._mongooseModel.create(entity);
  }

  async update(id: string, entity: T): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this
      ._mongooseModel
      .findOneAndUpdate({ _id: id }, entity, { returnOriginal: false });
  }

  async read(): Promise<T[]> {
    return this._mongooseModel.find();
  }

  async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this._mongooseModel.findById(id);
  }

  async delete(id: string): Promise<T | null> {
    if (!isValidObjectId) return null;
    return this._mongooseModel.findByIdAndDelete({ _id: id });
  }
}