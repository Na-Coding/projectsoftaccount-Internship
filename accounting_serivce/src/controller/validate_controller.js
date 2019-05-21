var errorMessages = require('../const/error_message');
var jwt = require('jsonwebtoken')
/////////////////////////////////////////////////////   page customer ///////////////////////////////////////////////////// 
exports.validate_add_customer = function () {
	return function (req, res, next) {
		if (
			req.body.customer_type &&
			req.body.initials_customer &&
			req.body.name_customer &&
			req.body.tax_ident_cm &&
			req.body.address_customer
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_customer = function () {
	return function (req, res, next) {
		if (req.body.name_customer) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_customer_code_qt = function () {
	return function (req, res, next) {
		if ((req.body.code_qt, req.body.name_customer, req.body.name_project_qt)) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_name_customer = function () {
	return function (req, res, next) {
		if (req.body.code_customer) {
			next();
		} else {
			res.status(400).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_page_edit_customer = function () {
	return function (req, res, next) {
		if (req.body.code_customer) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_update_datacustomer = function () {
	return function (req, res, next) {
		if (
			req.body.customer_type &&
			req.body.initials_customer &&
			req.body.name_customer &&
			req.body.tax_ident_cm &&
			req.body.address_customer &&
			req.body.code_customer
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_name_project = function () {
	return function (req, res, next) {
		if (req.body.code_customer) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};
exports.validate_delete_information = function () {
	return function (req, res, next) {
		if (
			req.body.code_customer
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

/////////////////////////////////////////////////////   page qt  ///////////////////////////////////////////////////// 
exports.validate_add_quotation = function () {
	return function (req, res, next) {
		if (
			req.body.name_project_qt &&
			req.body.date_qt &&
			req.body.date_end_qt &&
			req.body.data_particulars_array &&
			req.body.code_customer &&
			req.body.name_customer
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_customer_code_qt = function () {
	return function (req, res, next) {

		if (
			req.body.name_customer,
			req.body.name_project_qt,
			req.body.date_qt,
			req.body.code_qt


		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}

	};
};

exports.validate_get_quotation = function () {
	return function (req, res, next) {
		if (req.body.code_id) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_edit_quotation = function () {
	return function (req, res, next) {
		if (req.body.name_project_qt) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};
exports.validate_update_history_qt = function () {
	return function (req, res, next) {
		if (
			req.body.code_qt &&
			req.body.name_project_qt &&
			req.body.data_particulars_array
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

/////////////////////////////////////////////////////   page iv  ///////////////////////////////////////////////////// 
exports.validate_get_quotation_to_iv = function () {
	return function (req, res, next) {
		if (
			req.body.name_customer &&
			req.body.name_project_qt &&
			req.body.code_qt
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_nameproject_to_iv = function () {
	return function (req, res, next) {
		if ((req.body.name_customer)) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_add_invoice = function () {
	return function (req, res, next) {
		if (
			req.body.name_project_iv &&
			req.body.date_iv &&
			req.body.date_end_iv &&
			req.body.data_particulars_array &&
			req.body.code_customer &&
			req.body.name_customer
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_invoicepdf_code_qt = function () {
	return function (req, res, next) {
		if ((
			req.body.name_customer,
			req.body.name_project_iv,
			req.body.date_iv,
			req.body.code_iv
		)) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_check_type = function () {
	return function (req, res, next) {
		if ((req.body.name_customer, req.body.name_project_qt)) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_show_date = function () {
	return function (req, res, next) {
		if (req.body.name_project_iv) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_data_history = function () {
	return function (req, res, next) {
		if (
			req.body.code_iv
			// req.body.dete_iv
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};
exports.validate_update_history_iv = function () {
	return function (req, res, next) {
		if (
			req.body.code_iv &&
			req.body.name_project_iv &&
			req.body.data_particulars_array
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

/////////////////////////////////////////////////////   page hs  ///////////////////////////////////////////////////// 
exports.validate_add_receipt = function () {
	return function (req, res, next) {
		if (
			req.body.name_project_hs &&
			req.body.date_hs &&
			req.body.date_end_hs &&
			req.body.data_particulars_array &&
			req.body.code_customer &&
			req.body.name_customer
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_receiptpdf_code_qt = function () {
	return function (req, res, next) {
		if ((
			req.body.name_customer,
			req.body.name_project_hs,
			req.body.date_hs,
			req.body.code_hs
		)) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_invoice_to_hs = function () {
	return function (req, res, next) {
		if (req.body.name_customer,
			req.body.name_project_iv,
			req.body.code_iv) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_get_nameproject_to_hs = function () {
	return function (req, res, next) {
		if ((req.body.name_customer)) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_show_date_hs = function () {
	return function (req, res, next) {
		if (req.body.name_project_hs) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_data_history_hs = function () {
	return function (req, res, next) {
		if (
			req.body.code_hs
			// req.body.dete_hs
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};
exports.validate_update_history_hs = function () {
	return function (req, res, next) {
		if (
			req.body.code_hs &&
			req.body.name_project_hs &&
			req.body.data_particulars_array
		) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

/////////////////////////////////////////////////////   page user  ///////////////////////////////////////////////////// 
exports.validate_user_login = function () {
	return function (req, res, next) {
		if (req.body.username && req.body.password) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};

exports.validate_token = function () {
	return function (req, res, next) {
		try {
			const decode = jwt.verify(req.session.ck_1, 'key')
			if (decode) {
				req.user_id = decode.user_id
				next()
			} else {
				res.status(400).json({ success: false, messages: 'token not found' });
			}
		} catch (error) {
			res.status(400).json({ success: false, messages: 'token not found' });
		}
	}
}
////////////////////////////////////////////////// page pdf /////////////////////////////////////////////////
exports.validate_delete_pdf_iv = function () {
	return function (req, res, next) {
		if (req.body.code_delete) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};
exports.validate_delete_pdf_qt = function () {
	return function (req, res, next) {
		if (req.body.code_delete) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};
exports.validate_delete_pdf_hs = function () {
	return function (req, res, next) {
		if (req.body.code_delete) {
			next();
		} else {
			res.status(200).json(errorMessages.invalid_data);
			return;
		}
	};
};











///////////////////////////////////////////////////////////////////////////////////////////////////
// exports.validate_get_invoice = function () {
// 	return function (req, res, next) {
// 		if (req.body.code_id) {
// 			next();
// 		} else {
// 			res.status(200).json(errorMessages.invalid_data);
// 			return;
// 		}
// 	};
// };

// exports.validate_get_receipt = function () {
// 	return function (req, res, next) {
// 		if (req.body.code_id) {
// 			next();
// 		} else {
// 			res.status(200).json(errorMessages.invalid_data);
// 			return;
// 		}
// 	};
// };