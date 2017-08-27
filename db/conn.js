const Sequelize = require('sequelize')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/acme_cart'
const db = new Sequelize(connectionString, { logging: false })

module.exports = db