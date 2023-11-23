const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');

describe('Testando o model de produtos', function () {
  afterEach(function () { sinon.restore(); });
  it('testa se getAll retorna todos os produtos', async function () {
    const dbProducts = [{
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do CapitÃ£o AmÃ©rica',
    }];

    sinon.stub(connection, 'execute').resolves([dbProducts]);
    const result = await productModel.getAll();
    expect(result).to.be.deep.equal(dbProducts);
  });
  it('testa se findById retorna um produto', async function () {
    const dbProduct = [{
      id: 1,
      name: 'Martelo de Thor',
    }];
    sinon.stub(connection, 'execute').resolves([[dbProduct]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(dbProduct);
  });
});