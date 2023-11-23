const express = require('express');
require('express-async-errors');

const productRoute = require('./routes/productRoute');
const salesRoute = require('./routes/salesRoute');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRoute);
app.use('/sales', salesRoute);

app.use((error, _req, res, _next) => res.status(500).json({ error: error.message }));

module.exports = app;
