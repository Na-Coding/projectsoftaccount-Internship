const express = require('express');
const router = express.Router();
const receiptUtil = require('../controller/receiptcontroller');
const validateUtil = require('../controller/validate_controller');

/////////////////////////////////////////////////////   page hs  ///////////////////////////////////////////////////// 
router.post('/user_add_receipt',
	validateUtil.validate_token(),
	validateUtil.validate_add_receipt(),
	receiptUtil.user_add_receipt(),
	function (req, res) {
		res.status(200).json({
			success: true,
			message: 'เพิ่มข้อมูลลูกค้าเรียบร้อย',
			result: req.result,
		});
	});
router.get('/get_run_number_hs',
	validateUtil.validate_token(),
	receiptUtil.get_run_number_hs(),
	function (req, res) {
		res.status(200).json({
			success: true,
			result: req.result,
		});
	});
router.post('/get_name_project',
	validateUtil.validate_token(),
	validateUtil.validate_get_name_project(),
	receiptUtil.get_name_project(),
	function (req, res) {
		res.status(200).json({
			success: true,
			result: req.result,
		});
	});
router.post('/show_date_hs',
	validateUtil.validate_token(),
	validateUtil.validate_show_date_hs(),
	receiptUtil.show_date_hs(),
	function (req, res) {
		res.status(200).json({
			success: true,
			message: 'ดึงข้อมูลสำเร็จ',
			result: req.result,
		});
	});
router.post('/data_history_hs',
	validateUtil.validate_token(),
	validateUtil.validate_data_history_hs(),
	receiptUtil.data_history_hs(),
	function (req, res) {
		res.status(200).json({
			success: true,
			message: 'ดึงข้อมูลสำเร็จ',
			result: req.result,
		});
	});
router.post('/update_history_hs',
	validateUtil.validate_token(),
	validateUtil.validate_update_history_hs(),
	receiptUtil.update_history_hs(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "อัพเดทข้อมูลสำเร็จ",
			result: req.result
		})
	}
)
/////////////////////////////////////////////////////   page pdf  ///////////////////////////////////////////////////// 
router.post('/user_get_receiptpdf',
	validateUtil.validate_token(),
	validateUtil.validate_get_receiptpdf_code_qt(),
	receiptUtil.user_get_receiptpdf(),
	function (req, res) {
		res.status(200).json({
			success: true,
			message: 'เพิ่มข้อมูลลูกค้าเรียบร้อย',
			result: req.result,
		});
	}
);
router.post('/delete_pdf_hs',
	validateUtil.validate_token(),
	validateUtil.validate_delete_pdf_hs(),
	receiptUtil.delete_pdf_hs(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "delete data success",
			result: req.result
		})
	}
)

module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////
// router.post('/user_get_receipt',
// 	validateUtil.validate_get_receipt(),
// 	receiptUtil.user_get_receipt(), function (req, res) {
// 		res.status(200).json({
// 			success: true,
// 			message: 'ดึงข้อมูลสำเร็จ',
// 			result: req.result,
// 		});
// 	});