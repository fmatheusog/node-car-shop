import * as sinon from 'sinon';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/car.model';
import CarController from '../../../controllers/car.controller';
import CarService from '../../../services/car.service';
import { carExample } from '../mocks/car.mock';
import { Request, Response, NextFunction } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests car controller', () => {
  describe('Tests create method', () => {
    const req = {} as Request;
    const res = {} as Response;
    let next = () => ({}) as NextFunction;

    before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = carExample;
        next = sinon.stub();

        sinon.stub(mongoose.Model, 'create').resolves(carExample);
    });

    after(() => {
      (mongoose.Model.create as sinon.SinonStub).restore();
    })

    it('should return http code 201', async () => {
        const movieController = new CarController(new CarService(new CarModel()));           
        await movieController.create(req, res);

        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carExample)).to.be.true;
    });
  })

  describe('Tests read method', () => {
    const req = {} as Request;
    const res = {} as Response;
    let next = () => ({}) as NextFunction;

    before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.body = {}
        next = sinon.stub();

        sinon.stub(mongoose.Model, 'find').resolves([carExample]);
    });

    after(() => {
      (mongoose.Model.find as sinon.SinonStub).restore();
    })

    it('should return http code 201', async () => {
        const movieController = new CarController(new CarService(new CarModel()));           
        await movieController.read(req, res);

        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  })
});