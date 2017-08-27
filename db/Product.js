const db = require('./conn')
const Sequelize = db.Sequelize

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
})

Product.findProductsViewModel = () => {
    return Promise.all([
        Product.findAll(),
        db.models.order.getCart(),
        db.models.order.findAll({ where: { isCart: false }, include: [{ all: true, nested: true }] }),
    ])
        .then(([products, cart, pastOrders]) => {
            return { products, cart, pastOrders }
        })
}

module.exports = Product