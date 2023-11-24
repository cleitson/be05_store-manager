const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model');

describe('Testando o service de produtos', function () {
  afterEach(function () { sinon.restore(); });
  it('Testa se listAllProducts retorna todos os produtos', async function () {
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
    sinon.stub(productModel, 'getAll').resolves(dbProducts);
    const { status, data } = await productsService.listAllProducts();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(dbProducts);
  });
  it('Testa se findProductById retorna um produto pelo id', async function () {
    const dbProduct = {
      id: 1,
      name: 'Martelo de Thor',
    };
    sinon.stub(productModel, 'findById').resolves(dbProduct);
    const { status, data } = await productsService.findProductById(1);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(dbProduct);
  });
  it('retorna um erro caso o produto não seja encontrado', async function () {
    sinon.stub(productModel, 'findById').resolves(null);
    const { status, data } = await productsService.findProductById(99);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });
  it('Testa se insertNewProduct insere um produto', async function () {
    sinon.stub(productModel, 'insertNewProduct').resolves([{ insertId: 1 }]);
    const dbProduct = {
      id: 1,
      name: 'Traje Homen de ferro',
    };
    sinon.stub(productModel, 'findById').resolves(dbProduct);
    const { status, data } = await productsService.insertNewProduct('Traje Homen de ferro');

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.deep.equal(dbProduct);
  });
});