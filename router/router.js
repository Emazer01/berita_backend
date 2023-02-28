const express = require('express')
const router = express.Router()
const { userController } = require('../controller')
const Auth = require('../middleware/auth')
const { Validation } = require('../validators')

router.post('/register', Validation.register, userController.register)

router.post('/login', Validation.login, userController.login)

router.post('/verify', Auth.verifyToken, userController.verify)
/*
router.post('/updateprofile', Validation.updateprofile, Auth.verifyToken, userController.updateprofile)

router.post('/changepw', Validation.changePw, Auth.verifyToken, userController.changePw)

router.post('/addresses', Auth.verifyToken, userController.addresses)

router.post('/updateaddress', Validation.updateaddress, Auth.verifyToken, userController.updateaddress)

router.post('/addaddress', Validation.addaddress, Auth.verifyToken, userController.addaddress)

router.post('/deleteaddress', Auth.verifyToken, userController.deleteaddress)

router.post('/addrequest', Validation.addrequest, Auth.verifyToken, userController.addrequest)

router.post('/requests', Auth.verifyToken, userController.requests)

router.post('/deleterequest', Auth.verifyToken, userController.deleterequest)

router.post('/pickedrequest', Auth.verifyToken, userController.pickedrequest)

router.post('/addorder', Validation.addorder, Auth.verifyToken, userController.addorder)

router.post('/orders', Auth.verifyToken, userController.orders)

router.post('/updateorder', Auth.verifyToken, userController.updateorder)
*/
module.exports = router