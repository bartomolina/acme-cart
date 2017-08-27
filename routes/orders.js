const { Product, LineItem, Order } = require('../db').models;
const app = require('express').Router();

module.exports = app;

app.put('/:id', (req, res, next) => {
  Order.updateFromRequestBody(req.params.id, req.body)
    .then(() => res.redirect('/'))
    .catch(ex => {
      if (ex.message === 'Validation error: address required') {
        return Product.findProductsViewModel()
        .then(viewModel => {
            return res.render('index', { viewModel , errorMessage: ex.errors[0].message})
        })
      }
      next(ex);
    });
});

app.post('/:id/lineItems', (req, res, next) => {
  Order.addProductToCart(req.body.productId * 1)
    .then(() => res.redirect('/'))
    .catch(next);
});

app.delete('/:orderId/lineItems/:id', (req, res, next) => {
  Order.destroyLineItem(req.params.orderId, req.params.id)
    .then(() => res.redirect('/'))
    .catch(next);
});