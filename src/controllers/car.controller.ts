import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/car.service';

const INTERNAL_ERROR_MSG = 'Internal error';
const NOT_FOUND_ERROR_MSG = 'Object not found';

export default class CarController extends Controller<Car> {
  constructor(protected service = new CarService()) {
    super(service);
  }

  async create(
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<Response<Car | ResponseError>> {
    try {
      const { body } = req;

      const car = await this.service.create(body);
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: INTERNAL_ERROR_MSG });
    }
  }

  async read(
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<Response<Car[] | ResponseError>> {
    try {
      const allCars = await this.service.read();

      return res.status(200).json(allCars);
    } catch (err) {
      return res.status(500).json({ error: INTERNAL_ERROR_MSG });
    }
  }

  async readOne(
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError | null>,
  ): Promise<Response<Car | ResponseError | null>> {
    try {
      const { id } = req.params;

      const car = await this.service.readOne(id);

      if (!car) return res.status(404).json({ error: NOT_FOUND_ERROR_MSG });
      return res.status(200).json(car);
    } catch (err) {
      if ((err as Error).message.includes('Id')) {
        return res.status(400).json({ error: (err as Error).message });
      }
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  async update(
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<Response<Car | ResponseError>> {
    try {
      const { id } = req.params;
      const { body } = req;

      const car = await this.service.update(id, body);

      if (!car) return res.status(404).json({ error: NOT_FOUND_ERROR_MSG });
      return res.status(200).json(car);
    } catch (err) {
      if ((err as Error).message.includes('Id')) {
        return res.status(400).json({ error: (err as Error).message });
      }
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  async delete(
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<Response<Car | ResponseError>> {
    try {
      const { id } = req.params;

      const car = await this.service.delete(id);
      if (!car) return res.status(404).json({ error: NOT_FOUND_ERROR_MSG });
      return res.status(200).json();
    } catch (err) {
      if ((err as Error).message.includes('Id')) {
        return res.status(400).json({ error: (err as Error).message });
      }
      return res.status(500).json({ error: (err as Error).message });
    }
  }
}