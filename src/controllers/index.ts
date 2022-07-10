import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T,
}

export default abstract class Controller<T> {
  constructor(protected service: Service<T>) {}

  abstract create(
    _req: RequestWithBody<T>, _res: Response<T | ResponseError>
  ): Promise<typeof _res>;

  abstract read(
    _req: Request, _res: Response<T[] | ResponseError>
  ): Promise<typeof _res>;

  abstract readOne(
    _req: Request<{ id: string }>, _res: Response<T | ResponseError>
  ): Promise<typeof _res>;

  abstract update(
    _req: Request<{ id: string }>, _res: Response<T | ResponseError>
  ): Promise<typeof _res>;

  abstract delete(
    _req: Request<{ id: string }>, _res: Response<T | ResponseError>
  ): Promise<typeof _res>;
}