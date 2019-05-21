const express = require('express')
const router = express.Router()
const quotationUtil = require('../controller/quotationcontroller')
const validateUtil = require('../controller/validate_controller')

router.post('/user_add_quotation',
	validateUtil.validate_token(),
	validateUtil.validate_add_quotation(),
	quotationUtil.user_add_quotation(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "เพิ่มข้อมูลลูกค้าเรียบร้อย",
			result: req.result
		})
	}
)
router.get("/get_name_all",
	validateUtil.validate_token(),
	quotationUtil.get_name_all(),
	function (req, res) {
		res.status(200).json({
			success: true,
			result: req.result
		});
	}
);

router.get("/get_order_quotation",
	validateUtil.validate_token(),
	quotationUtil.get_order_quotation(),
	function (req, res) {
		res.status(200).json({
			success: true,
			result: req.result
		});
	}
);

router.post('/user_get_quotation_to_iv',
	validateUtil.validate_token(),
	validateUtil.validate_get_quotation_to_iv(),
	quotationUtil.user_get_quotation_to_iv(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "ได้รับข้อมูล",
			result: req.result
		})
	}
)
router.post('/get_project_all',
	validateUtil.validate_token(),
	validateUtil.validate_get_nameproject_to_iv(),
	quotationUtil.get_project_all(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "ได้รับข้อมูล",
			result: req.result
		})
	}
)
router.get('/get_run_number_qt',
	validateUtil.validate_token(),
	quotationUtil.get_run_number_qt(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			result: req.result
		})
	}
)
router.post('/get_name_project',
	quotationUtil.get_name_project(),
	validateUtil.validate_get_name_project(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			result: req.result
		})
	}
)
router.post('/edit_quotation',
	validateUtil.validate_token(),
	validateUtil.validate_edit_quotation(),
	quotationUtil.edit_quotation(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "ดึงข้อมูลสำเร็จ",
			result: req.result
		})
	}
)
router.post('/update_history_qt',
	validateUtil.validate_token(),
	validateUtil.validate_update_history_qt(),
	quotationUtil.update_history_qt(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "อัพเดทข้อมูลสำเร็จ",
			result: req.result
		})
	}
)
///////////***************PDF***************/////////
router.get("/get_name_pdf",
	validateUtil.validate_token(),
	quotationUtil.get_name_pdf(),
	function (req, res) {
		res.status(200).json({
			success: true,
			result: req.result
		});
	}
);
router.post('/user_get_quotation_pdf',
	validateUtil.validate_token(),
	validateUtil.validate_get_customer_code_qt(),
	quotationUtil.user_get_quotation_pdf(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "เพิ่มข้อมูลลูกค้าเรียบร้อย",
			result: req.result
		})
	}
)
router.post('/delete_pdf_qt',
	validateUtil.validate_token(),
	validateUtil.validate_delete_pdf_qt(),
	quotationUtil.delete_pdf_qt(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			message: "delete data success",
			result: req.result
		})
	}
)

///////////////////////////////////////////////////////////////
router.get('/get_run_number_qt',
	validateUtil.validate_token(),
	quotationUtil.get_run_number_qt(),
	function (req, res) {
		res.status(200).json({
			'success': true,
			result: req.result
		})
	}
)
router.get("/get_data_quotion",
	validateUtil.validate_token(),
	quotationUtil.get_data_quotion(),
	function (req, res) {
		res.status(200).json({
			success: true,
			result: req.result
		});
	}
);
router.get("/get_particulars_array",
	validateUtil.validate_token(),
	quotationUtil.get_particulars_array(),
	function (req, res) {
		res.status(200).json({
			success: true,
			result: req.result
		});
	}
);
module.exports = router;
// router.post('/user_get_quotation',
// 	validateUtil.validate_get_customer(),
// 	quotationUtil.user_get_quotation(),
// 	function (req, res) {
// 		res.status(200).json({
// 			'success': true,
// 			message: "ดึงข้อมูลสำเร็จ",
// 			result: req.result
// 		})
// 	}
// )



//////////////////////////////////////////////////////////////////////////////////////

