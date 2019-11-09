const express=require('express');
var multer = require('multer');
const controller=require('../controllers/mugs.js');

const router=express.Router();
var upload = multer({ dest: 'public/images/' });

router.use(function(req,res,next){
	if(req.session.userId)
		next();
	else
		res.redirect('/accounts');
});

router.get('/',controller.home);
router.get('/sell/add',controller.addMugGet);
router.post('/sell/add',upload.single('picture'),controller.addMugPost);
router.get('/sell/downloadModel/:id',controller.downloadModel);

module.exports=router;