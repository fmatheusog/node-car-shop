import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/car.model';

export default class CarService {
  constructor(
    private carRepository: CarModel,
  ) {}
  
  async create(payload: Car): Promise<Car> {
    const newCar = await this.carRepository.create(payload);

    return newCar;
  }

  async read(): Promise<Car[]> {
    const allCars = await this.carRepository.read();

    return allCars;
  }

  async readOne(id: string): Promise<Car | null> {
    const car = await this.carRepository.readOne(id);

    if (!car) return null;
    return car;
  }

  async update(id: string, payload: Car): Promise<Car | null> {
    const editCar = await this.carRepository.update(id, payload);

    if (!editCar) return null;
    return editCar;
  }

  async delete(id: string): Promise<Car | null> {
    const deleteCar = await this.carRepository.delete(id);

    if (!deleteCar) return null;
    return deleteCar;
  }
}
