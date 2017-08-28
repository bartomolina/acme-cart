const db = require('./conn')
const Sequelize = db.Sequelize

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "address required"
            }
        }
    }
})

Order.getCart = () => {
    return Order.findOne({ where: { isCart: true }, include: [{ all: true, nested: true }] })
        .then(cart => {
            return cart || Order.create()
        })
}

Order.updateFromRequestBody = (id, body) => {
    return Order.update(body, { where: { id } })
}

Order.addProductToCart = (productId) => {
    return Order.getCart()
        .then(cart => {
            lineItem = cart.lineItems.find(x => x.dataValues.productId === productId)
            return lineItem ? lineItem.set('quantity', lineItem.quantity + 1).save() : db.models.lineItem.create({ productId, orderId: cart.id })
        })
}

Order.destroyLineItem = (orderId, id) => {
    return db.models.lineItem.destroy({ where: { id } })
}

module.exports = Order