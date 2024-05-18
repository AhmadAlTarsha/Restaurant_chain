const mysql = require("mysql2");

const Sequelize = require("sequelize");

const sequelize = new Sequelize("restaurant_chain", "root", "", {
  dialect: "mysql",
//   port: process.env.PORTDB,
  host: 'localhost',
});

module.exports = sequelize;