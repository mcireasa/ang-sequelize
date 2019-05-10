const Sequelize = require('sequelize');
const db = require('../config/database');

const Issue = db.define('issues', {
    title:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    },
    responsable:{
        type: Sequelize.STRING
    },
    severity:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.STRING
    },

})

module.exports = Issue;