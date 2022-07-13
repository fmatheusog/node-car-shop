import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { carExample, idExample } from '../mocks/car.mock';
import CarModel from '../../../models/car.model';
import mongoose from 'mongoose';

describe('Tests car model', () => {
  describe('Tests create method', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create').resolves(carExample);
    })

    after(() => {
      (mongoose.Model.create as SinonStub).restore();
    })

    it('should create new car', async () => {
      const carModel = new CarModel();

      const newCar = await carModel.create(carExample);
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
      const carModel = new CarModel();

      const allCars = await carModel.read();
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
      const carModel = new CarModel();

      const allCars = await carModel.readOne(idExample);
      expect(allCars).to.be.deep.equal(carExample);
    })
  })
})