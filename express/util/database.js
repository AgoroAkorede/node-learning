const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Oluwarotimi02", {
  dialect: "mysql",
  host: "localhost",
});

module.export = sequelize;
