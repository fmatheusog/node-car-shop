import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { carExample, idExample } from '../mocks/car.mock';
import CarModel from '../../../models/car.model';
import mongoose from 'mongoose';
import CarService from '../../../services/car.service';

describe('Tests car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Tests create method', () => {  
    before(() => {
      sinon.stub(mongoose.Model, 'create').resolves(carExample);
    })

    after(() => {
      (mongoose.Model.create as SinonStub).restore();
    })

    it('should create new car', async () => {
      const newCar = await carService.create(carExample);
      
      expect(newCar).to.be.deep.equal(carExample);
    })
  })

  describe('Tests read method', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'find').resolves([carExample]);
    })

    after(() => {
      (mongoose.Model.find as SinonStub).restore();
    })

    it('should return a car array', async () => {
      const allCars = await carService.read();

      expect(allCars).to.be.deep.equal([carExample]);
    })
  })

  describe('Tests read method', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'findOne').resolves(carExample);
    })

    after(() => {
      (mongoose.Model.findOne as SinonStub).restore();
    })

    it('should return a car', async () => {
      const car = await carService.readOne(idExample);

      expect(car).to.be.deep.equal(carExample);
    })
  })
})