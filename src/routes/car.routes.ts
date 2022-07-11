import { Router } from 'express';
import CarController from '../controllers/car.controller';
import CarService from '../services/car.service';
import CarModel from '../models/car.model';
import ZodErrorValidation from '../middlewares/zodError.middleware';
import { carSchema } from '../interfaces/CarInterface';
import { vehicleSchema } from '../interfaces/VehicleInterface';

const CarRoutes = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

CarRoutes.get(
  '/cars',
  (req, res) => carController.read(req, res),
);

CarRoutes.get(
  '/cars/:id',
  (req, res) => carController.readOne(req, res),
);

CarRoutes.post(
  '/cars',
  (req, res, next) => ZodErrorValidation(req, res, next, carSchema),
  (req, res, next) => ZodErrorValidation(req, res, next, vehicleSchema),
  (req, res) => carController.create(req, res),
);
CarRoutes.put(
  '/cars/:id',
  (req, res, next) => ZodErrorValidation(req, res, next, carSchema),
  (req, res) => carController.update(req, res),
);

CarRoutes.delete(
  '/cars/:id',
  (req, res) => carController.delete(req, res),
);

export default CarRoutes;
