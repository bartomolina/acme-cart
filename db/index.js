const db = require('./conn')

const Product = require('./Product')
const LineItem = require('./LineItem')
const Order = require('./Order')

LineItem.belongsTo(Product)
LineItem.belongsTo(Order)
Order.hasMany(LineItem)

const seed = () => {
    return require('./seed')(Product, LineItem, Order)
}

const sync = () => {
    return db.sync({ force: true })
}

module.exports = {
    sync,
    seed,
    models: { Product, LineItem, Order }
}