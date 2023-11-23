const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Testando o model de sales', function () {
  afterEach(function () { sinon.restore(); });
  it('testa se getAll retorna todos os sales', async function () {
    const dbSales = [
      {
        date: '2023-11-23T19:20:06.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023-11-23T19:20:06.000Z',
        productId: 2,
        quantity: 10,
      },
    ];
    sinon.stub(connection, 'execute').resolves([dbSales]);
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(dbSales);
  });
  it('testa se findById retorna uma sale', async function () {
    const dbSale = {
      date: '2023-11-23T19:20:06.000Z',
      productId: 3,
      quantity: 15,
    };
    sinon.stub(connection, 'execute').resolves([dbSale]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(dbSale);
  });
});