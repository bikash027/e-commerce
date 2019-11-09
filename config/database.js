const Sequelize=require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'hide$123#', {
  host: 'localhost',
  dialect:'mysql'
});

module.exports=sequelize;