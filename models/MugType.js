const Sequelize=require('sequelize');
const db=require('../config/database');
const Model = Sequelize.Model;

class MugType extends Model{};

MugType.init({
		name:{
			type: Sequelize.STRING,
			allowNull: false
		},
		visuals:{
			type: Sequelize.STRING,
			allowNull:false
		}
	},
	{
		sequelize:db,
		modelName:'mugType'
	}
);

MugType.sync({force:false});


// MugType.create({
// 	name: "paper-cup",
// 	visuals: "paper-cup"
// })
// .then(mugtype=>console.log(mugtype+ "mug successfully created"))
// .catch(err=>console.log(err));

// MugType.create({
// 	name: "ceramic-hd-coffee-cup",
// 	visuals: "ceramic-hd-coffee-cup"
// })
// .then(mugtype=>console.log(mugtype+ "mug successfully created"))
// .catch(err=>console.log(err));

// MugType.create({
// 	name: "culver-black-mug",
// 	visuals: "culver-black-mug"
// })
// .then(mugtype=>console.log(mugtype+ "mug successfully created"))
// .catch(err=>console.log(err));

// MugType.create({
// 	name: "round-ceremic-coffee-cup",
// 	visuals: "round-ceramic-coffee-cup"
// })
// .then(mugtype=>console.log(mugtype+ "mug successfully created"))
// .catch(err=>console.log(err));


module.exports=MugType;