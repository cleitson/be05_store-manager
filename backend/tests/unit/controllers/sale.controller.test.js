const sinon = require('sinon');
const { expect } = require('chai');
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');

describe('Testando o controller de sales', function () {
  it('testa se requestAllSales retorna todos as sales', async function () {
    const dbSales = [{
      id: 1,
      date: '2023-11-23T16:22:01.000Z',
    },
    {
      id: 2,
      date: '2023-11-23T16:22:01.000Z',
    },
    {
      id: 3,
      date: '2023-11-23T16:22:01.000Z',
    }];
    sinon.stub(salesService, 'listAllSales').resolves({ status: 'SUCCESSFUL', data: dbSales });
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.requestAllSales(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(dbSales)).to.be.equal(true);
  });

  it('Testa se requestSaleById retorna um sale', async function () {
    const dbSale = {
      id: 1,
      date: '2023-11-23T16:22:01.000Z',
    };
    sinon.stub(salesService, 'findSaleById').resolves({ status: 'SUCCESSFUL', data: dbSale });
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.requestSaleById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(dbSale)).to.be.equal(true);
  });
});