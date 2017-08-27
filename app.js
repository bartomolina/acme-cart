const express = require('express')
const swig = require('swig')
const db = require('./db')
const path = require('path')
const bodyParser = require('body-parser')
swig.setDefaults({ cache: false })

const app = express()

app.set('view engine', 'html')
app.engine('html', swig.renderFile)

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('method-override')('_method'))

app.post('/', (req, res, next) => {
    db.sync()
        .then(() => db.seed())
        .then(() => res.redirect('/'))
})

app.get('/', (req, res, next) => {
    db.models.Product.findProductsViewModel()
    .then(viewModel => {
        res.render('index', { viewModel })
    })
    .catch(next)
})

app.use('/orders', require('./routes/orders'))

app.use(function (req, res, next) {
    res.status(404).render('error', { error: { message: '404' } })
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).render('error', { error: err })
})

module.exports = app