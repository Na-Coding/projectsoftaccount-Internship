const express = require('express')
const router = express.Router()
const customerUtil = require('../controller/customercontroller')
const validateUtil = require('../controller/validate_controller')

router.post('/user_get_customer',
    validateUtil.validate_token(),
    validateUtil.validate_get_customer(),
    customerUtil.user_get_customer(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "ดึงข้อมูลสำเร็จ",
            result: req.result
        })
    }
)
router.get('/get_code_customer',
    validateUtil.validate_token(),
    customerUtil.get_code_customer(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "ดึงข้อมูลสำเร็จ",
            result: req.result
        })
    }
)
router.post('/user_get_name_customer',
    validateUtil.validate_token(),
    validateUtil.validate_get_name_customer(),
    customerUtil.user_get_name_customer(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "ดึงข้อมูลสำเร็จ",
            result: req.result
        })
    }
)
router.post('/user_add_customer',
    validateUtil.validate_token(),
    validateUtil.validate_add_customer(),
    customerUtil.user_add_customer(),
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
    customerUtil.get_name_all(),
    function (req, res) {
        res.status(200).json({
            success: true,
            result: req.result
        });
    }
);
router.get("/get_data",
    validateUtil.validate_token(),
    customerUtil.get_data(),
    function (req, res) {
        res.status(200).json({
            success: true,
            result: req.result
        });
    }
);
router.post("/page_edit_customer",
    validateUtil.validate_token(),
    customerUtil.page_edit_customer(),
    validateUtil.validate_page_edit_customer(),
    function (req, res) {
        res.status(200).json({
            success: true,
            result: req.result
        });
    }
);
router.post("/update_datacustomer",
    validateUtil.validate_token(),
    customerUtil.update_datacustomer(),
    validateUtil.validate_update_datacustomer(),
    function (req, res) {
        res.status(200).json({
            success: true,
            message: "แก้ไขข้อมูลลูกค้าเรียบร้อย",
            result: req.result
        });
    }
);
router.post("/delete_information",
    validateUtil.validate_token(),
    customerUtil.delete_information(),
    validateUtil.validate_delete_information(),
    function (req, res) {
        res.status(200).json({
            success: true,
            message: "ลบข้อมูลลูกค้าเรียบร้อย",
            result: req.result
        });
    }
);
//////////////////////////////////////////////////////////////////////////////////////
module.exports = router;




