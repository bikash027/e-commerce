const express=require('express');
const router=express.Router();
const controller=require('../controllers/users');

router.get('/',controller.home);
router.post('/login',controller.loginPost);
router.get('/register',controller.registerGet);
router.post('/register',controller.registerPost);
router.get('/logout',controller.logout);

module.exports=router;