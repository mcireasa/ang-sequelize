const Sequelize = require('sequelize');

module.exports = new Sequelize('issue_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorAlises: false
})

