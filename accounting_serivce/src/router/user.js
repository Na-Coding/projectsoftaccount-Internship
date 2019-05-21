const express = require('express');
const router = express.Router();
const userUtil = require('../controller/usercontroller');
const validateUtil = require('../controller/validate_controller');

router.post('/user_login',
	validateUtil.validate_user_login(),
	userUtil.user_login(),
	function (req, res) {
		req.session = { ck_1: req.result }
		res.status(200).json({
			success: true,
			message: 'เข้าสู่ระบบสำเร็จ'
		});
	});
router.get('/user_logout',
	function (req, res) {
		req.session = null
		res.status(200).json({
			success: true,
			message: 'ออกจากระบบสำเร็จ'
		});
	});
router.get('/check_token',
	validateUtil.validate_token(),
	function (req, res) {
		res.status(200).json({
			success: true,
			message: 'check token success'
		});
	});
router.post('/change_password',
	validateUtil.validate_token(),
	userUtil.change_password(),
	function (req, res) {
		res.status(200).json({
			success: true,
			message: 'update password success'
		})
	})

module.exports = router;    