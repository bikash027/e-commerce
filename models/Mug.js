const Sequelize=require('sequelize');
const db=require('../config/database');
const MugType=require('./MugType');
const Model=Sequelize.Model;

class Mug extends Model{};

Mug.init({
		artist:{
			type:Sequelize.STRING
		},
		picture:{
			type:Sequelize.BLOB('medium'),
			allowNull:false
		},
		price:{
			type:Sequelize.INTEGER,
			allowNull:false
		}
	},{
		sequelize:db,
		modelName:'mug'
	})

MugType.hasMany(Mug);

Mug.sync({force:false});
module.exports=Mug;