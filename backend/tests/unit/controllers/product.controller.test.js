const sinon = require('sinon');
const { expect } = require('chai');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const validateNewProduct = require('../../../src/middlewares/validateNewProduct.middleware');

describe('Testando o controller de produtos', function () {
  afterEach(function () { sinon.restore(); });
  it('Testa se requestAllProducts retorna todos os produtos', async function () {
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
    sinon.stub(productsService, 'listAllProducts').resolves({ status: 'SUCCESSFUL', data: dbProducts });
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.requestAllProducts(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(dbProducts)).to.be.equal(true);
  });

  it('Testa se requestProductById retorna um produto', async function () {
    const dbProduct = {
      id: 1,
      name: 'Martelo de Thor',
    };
    sinon.stub(productsService, 'findProductById').resolves({ status: 'SUCCESSFUL', data: dbProduct });
    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.requestProductById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(dbProduct)).to.be.equal(true);
  });
  it('Testa se insertNewProduct insere um produto', async function () {
    const dbProduct = {
      id: 1,
      name: 'Traje Homen de ferro',
    };
    sinon.stub(productsService, 'insertNewProduct').resolves({ status: 'CREATED', data: dbProduct });
    const req = { body: { name: 'Traje Homen de ferro' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.requestNewProduct(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(dbProduct)).to.be.equal(true);
  });
  it('Testa se ao cadastrar produto sem nome retorna um erro', async function () {
    const req = { body: { name: '' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const next = sinon.stub();

    await validateNewProduct(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
  });
  it('Testa se ao cadastrar produto com nome menor que 5 caracteres retorna um erro', async function () {
    const req = { body: { name: 'abc' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const next = sinon.stub();

    await validateNewProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
  });
});