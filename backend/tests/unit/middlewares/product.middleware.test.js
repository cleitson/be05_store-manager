const sinon = require('sinon');
const { expect } = require('chai');
const validateNewProduct = require('../../../src/middlewares/validateNewProduct.middleware');

describe('Testando os middlewares de produtos', function () {
  afterEach(function () { sinon.restore(); });
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