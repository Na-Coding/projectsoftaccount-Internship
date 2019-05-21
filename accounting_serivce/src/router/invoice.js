const express = require('express');
const router = express.Router();
const invoiceUtil = require('../controller/invoicecontroller');
const validateUtil = require('../controller/validate_controller');
/////////////////////////////////////////////////////   page iv  ///////////////////////////////////////////////////// 
router.post('/get_name_project',
    validateUtil.validate_token(),
    validateUtil.validate_get_name_project(),
    invoiceUtil.get_name_project(),
    function (req, res) {
        res.status(200).json({
            success: true,
            result: req.result,
        });
    });
router.post('/user_add_invoice',
    validateUtil.validate_token(),
    validateUtil.validate_add_invoice(),
    invoiceUtil.user_add_invoice(),
    function (req, res) {
        res.status(200).json({
            success: true,
            message: 'เพิ่มข้อมูลลูกค้าเรียบร้อย',
            result: req.result
        });
    });
router.get('/get_run_number_iv',
    validateUtil.validate_token(),
    invoiceUtil.get_run_number_iv(),
    function (req, res) {
        res.status(200).json({
            success: true,
            result: req.result,
        });
    });
router.post('/show_date',
    validateUtil.validate_token(),
    validateUtil.validate_show_date(),
    invoiceUtil.show_date(),
    function (req, res) {
        res.status(200).json({
            success: true,
            message: 'ดึงข้อมูลสำเร็จ',
            result: req.result,
        });
    });
router.post('/data_history',
    validateUtil.validate_token(),
    validateUtil.validate_data_history(),
    invoiceUtil.data_history(),
    function (req, res) {
        res.status(200).json({
            success: true,
            message: 'ดึงข้อมูลสำเร็จ',
            result: req.result,
        });
    });
router.post('/update_history_iv',
    validateUtil.validate_token(),
    validateUtil.validate_update_history_iv(),
    invoiceUtil.update_history_iv(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "อัพเดทข้อมูลสำเร็จ",
            result: req.result
        })
    }
)
/////////////////////////////////////////////////////   page hs  ///////////////////////////////////////////////////// 
router.post('/user_get_invoice_to_hs',
    validateUtil.validate_token(),
    validateUtil.validate_get_invoice_to_hs(),
    invoiceUtil.user_get_invoice_to_hs(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "เพิ่มข้อมูลลูกค้าเรียบร้อย",
            result: req.result
        })
    }
)
router.get("/get_name_all_hs",
    validateUtil.validate_token(),
    invoiceUtil.get_name_all_hs(),
    function (req, res) {
        res.status(200).json({
            success: true,
            result: req.result
        });
    }
);
router.post('/get_project_all_hs',
    validateUtil.validate_token(),
    validateUtil.validate_get_nameproject_to_hs(),
    invoiceUtil.get_project_all_hs(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "เพิ่มข้อมูลลูกค้าเรียบร้อย",
            result: req.result
        })
    }
)
/////////////////////////////////////////////////////   page pdf  ///////////////////////////////////////////////////// 
router.post('/user_get_invoicepdf',
    validateUtil.validate_token(),
    validateUtil.validate_get_invoicepdf_code_qt(),
    invoiceUtil.user_get_invoicepdf(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "เพิ่มข้อมูลลูกค้าเรียบร้อย",
            result: req.result
        })
    }
)

router.post('/check_type_pdf',
    validateUtil.validate_token(),
    validateUtil.validate_check_type(),
    invoiceUtil.check_type_pdf(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "เพิ่มข้อมูลลูกค้าเรียบร้อย",
            result: req.result
        })
    }
)
router.post('/delete_pdf_iv',
    validateUtil.validate_token(),
    validateUtil.validate_delete_pdf_iv(),
    invoiceUtil.delete_pdf_iv(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "delete data success",
            result: req.result
        })
    }
)

module.exports = router;

// //////////////////////////////////////////////////////////////////////////////////////


// router.post('/user_get_invoice',
//     validateUtil.validate_get_invoice(),
//     invoiceUtil.user_get_invoice(),
//     function (req, res) {
//         res.status(200).json({
//             success: true,
//             message: 'ดึงข้อมูลสำเร็จ',
//             result: req.result,
//         });
//     });