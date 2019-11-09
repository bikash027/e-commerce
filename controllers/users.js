const hash = require('pbkdf2-password')()

const User=require('../models/User');
const controller={};

controller.home=function(req,res){
	res.render('pages/login.ejs');
}

controller.loginPost=function(req,res){
	console.log("logging in");
	User.findAll({
		where: { email: req.body.email }
	})
	.then(users=>users[0].dataValues)
	.then(user=>{
		authenticate(req,user,(err,user)=>{
			if(user){
				req.session.userId=user.id;
				res.redirect('/mugs');
			}
			else{
				res.redirect('/accounts');
			}
		});
	})
	.catch(err=>{
		console.log(err)
		res.send("something went wrong");
	});
}

controller.registerGet=function(req,res){
	res.render('pages/register.ejs')
}

controller.registerPost=function(req,res){
	hash({password: req.body.password},(err, pass, salt, hash)=>{
		const user=User.build({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			salt: salt,
			hash: hash
		});
		user.save()
		.then(jane => {
		  console.log("Jane's auto-generated ID:", jane.id);
		  res.redirect('/accounts/');
		});
	})
	
	// console.log(req.body.firstName,req.body.lastName);
}
controller.logout=function(req,res){
	if(!req.session.userId)
		res.send('how did you get here?');
	else{
		req.session.destroy(()=>{
			res.redirect('/accounts');
		})
	}
}
function authenticate(req,user,fn){
	hash({password: req.body.password, salt: user.salt},(err, pass, salt, hash)=>{
		if(err)
			return fn(err);
		if(hash==user.hash)
			return fn(null,user);
		else
			fn(new Error('invalid password'));

	});
}
module.exports=controller;