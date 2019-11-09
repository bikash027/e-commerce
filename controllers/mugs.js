const Mug=require('../models/Mug');
const MugType=require('../models/MugType');
const fs=require('fs');
const controller={};

controller.home=function(req,res){
	Mug.findAll()
	.then(mugs=>{
		// return mugs.map(mug=>{
		if(mugs.length===0)
			res.send("no mugs yet");
		const ar=[];
		for(let i=0;i<mugs.length;i++){
			const mug=mugs[i];
			const ob={};
			const data=mug.picture;
			const buf=new Buffer(data,'binary');
			const outputFile=`public/images/output${i}.jpg`;
			const fd = fs.openSync(outputFile, 'w');
			fs.writeFileSync(fd, buf);
			ob.picture=outputFile.substring(6);
			MugType.findAll({
				attributes: ['name'],
				where:{ id: mug.dataValues.mugTypeId }
			})
			.then(mugTypes=>{
				// console.log(mugTypes);
				return mugTypes[0].dataValues.name
			})
			.then(name=>{
				ob.name=name;
				ar.push(ob);
				if(i===mugs.length-1)
					res.render('pages/mugs.ejs',{mugs:ar});
			})
		}
	})
	// res.render('pages/mugs.ejs',{mugsArray:mugsArray});
}

controller.addMugGet=function(req,res){
	MugType.findAll()
	.then(mugTypes=> mugTypes.map(mugType=>mugType.dataValues))
	.then(mugTypes=>{
		res.render('pages/mugForm.ejs',{mugTypes});
	})
	.catch(err=>console.log(err));
	
}

controller.addMugPost=function(req,res){
	const imageData = fs.readFileSync(req.file.path);
	MugType.findAll({
		attributes: ['id'],
		where:{ name: req.body.mugType }
	})
	.then(mugTypeId=>{
		Mug.create(
		{
			artist: req.body.artist,
			picture: imageData,
			price: req.body.price,
			mugTypeId: mugTypeId[0].dataValues.id
		})
		.then(mug=>
			fs.unlink(req.file.path,err=>{
				if(err)
					console.log(err);
				else
					console.log('file deleted');
				res.sendStatus(200);
			})
		)
		.catch(err=>console.log(err));
			
	})
	.catch(err=>{
		console.log(err);
		res.send("something went wrong")
	});
}

controller.downloadModel=function(req,res){
	const mugTypeId=req.params.id;
	MugType.findAll(
		{
			attributes: ['visuals'],
			where: { id:mugTypeId }
		}
	)
	.then(mugTypes=>mugTypes[0].dataValues.visuals)
	.then(visuals=>{
		res.download(`public/mugModels/${visuals}.zip`,`${visuals}.zip`);
	})
	.catch(err=>console.log(err));
	// res.send("reached sell");
}

module.exports=controller;

