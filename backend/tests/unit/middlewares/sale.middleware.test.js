const sinon = require('sinon');
const { expect } = require('chai');
const validateSale = require('../../../src/middlewares/validateNewSale.middleware');
const productService = require('../../../src/services/products.service');

describe('Testando os middlewares de sales', function () {
  afterEach(function () { sinon.restore(); });
  it('Testa se ao cadastrar sale sem produto retorna um erro', async function () {
    const req = { body: [{ quantity: 2 }] };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const next = sinon.stub();

    await validateSale.productRequired(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
  });
  it('Testa se ao cadastrar sale sem quantidade retorna um erro', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const next = sinon.stub();

    await validateSale.quantityRequired(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
  });
  it('Testa se ao cadastrar sale com quantidade menor que 1 retorna um erro', async function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const next = sinon.stub();

    await validateSale.numberQuantity(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
  });
  it('Testa se ao cadastrar sale com produto inexistente retorna um erro', async function () {
    const req = { body: [{ productId: 50, quantity: 2 }] };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'findProductById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    const next = sinon.stub();

    await validateSale.productExist(req, res, next);

    expect(res.status.calledWith(404)).to.be.equal(true);
  });
});