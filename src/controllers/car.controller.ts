import { Request, Response } from 'express';
import CarService from '../services/car.service';

const NOT_FOUND_ERROR_MSG = 'Object not found';
const ID_LENGTH_ERROR_MSG = 'Id must have 24 hexadecimal characters';

export default class CarController {
  constructor(
    private carService: CarService,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { body } = req;

      const car = await this.carService.create(body);
      return res.status(201).json(car);
    } catch (err) {
      console.log(err);
    }
  }

  async read(req: Request, res: Response) {
    try {
      const allCars = await this.carService.read();

      return res.status(200).json(allCars);
    } catch (err) {
      console.log(err);
    }
  }

  async readOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: ID_LENGTH_ERROR_MSG });
      }

      const car = await this.carService.readOne(id);
      if (!car) return res.status(404).json({ error: NOT_FOUND_ERROR_MSG });
      return res.status(200).json(car);
    } catch (err) {
      console.log(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: ID_LENGTH_ERROR_MSG });
      }

      const { body } = req;

      const editCar = await this.carService.update(id, body);
      if (!editCar) return res.status(404).json({ error: NOT_FOUND_ERROR_MSG });
      return res.status(200).json(editCar);
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: ID_LENGTH_ERROR_MSG });
      }

      const deleteCar = await this.carService.delete(id);
      if (!deleteCar) {
        return res.status(404).json({ error: NOT_FOUND_ERROR_MSG });
      }
      return res.status(204).json(deleteCar);
    } catch (err) {
      console.log(err);
    }
  }
}
