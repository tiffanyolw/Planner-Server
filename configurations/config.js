const Sequelize = require("sequelize");
const config = new Sequelize("plannerapp", "user", "", {dialect: "mysql"});

module.exports = config;