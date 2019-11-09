const Sequelize=require('sequelize');
const db=require('../config/database');
const Model = Sequelize.Model;
class User extends Model {}
User.init({
  // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    email:{
      type: Sequelize.STRING,
      allowNull: false
    },
    salt:{
      type:Sequelize.STRING.BINARY,
      allowNull: false
    },
    hash:{
      type: Sequelize.STRING.BINARY,
      allowNull:false
    }
  },
  {
    sequelize:db,
    modelName: 'user'
    // options
  });

User.sync({force:false});

module.exports=User;