const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

describe('Testando o service de sales', function () {
  afterEach(function () { sinon.restore(); });
  it('testa se listAllSales retorna todos as sales', async function () {
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
    sinon.stub(salesModel, 'getAll').resolves(dbSales);
    const { status, data } = await salesService.listAllSales();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(dbSales);
  });
  it('testa se findSaleById retorna uma sale pelo id', async function () {
    const dbSale = {
      id: 1,
      date: '2023-11-23T16:22:01.000Z',
    };
    sinon.stub(salesModel, 'findById').resolves(dbSale);
    const { status, data } = await salesService.findSaleById(1);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(dbSale);
  });
  it('testa se findSaleById retorna um erro caso a sale não seja encontrada', async function () {
    sinon.stub(salesModel, 'findById').resolves(null);
    const { status, data } = await salesService.findSaleById(99);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });
});