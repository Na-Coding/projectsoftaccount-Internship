// let createConnection = require("../connection/dbconnection");
let moment = require('moment')
let knex = require('../connection/dbconnection')

/////////////////////////////////////////////////////   page iv  ///////////////////////////////////////////////////// 
exports.get_name_project = function () {
	return async function (req, res, next) {
		try {
			const name_project_iv = await knex('invoice').select('code_iv', 'name_project_iv').where({ active_iv: 1, customer_id: req.body.code_customer }).groupBy('name_project_iv')
			req.result = name_project_iv;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.user_add_invoice = function () {
	return async function (req, res, next) {
		try {
			const {
				name_project_iv,
				date_iv,
				payment_iv,
				date_end_iv,
				refer_iv,
				code_customer,
				name_customer,
				data_particulars_array,
				amount_iv,
				discount_iv,
				sum_discount_iv,
				amount_afterdiscount_iv,
				total_vat_iv,
				total_amount_iv,
				note_form
			} = req.body;
			const run_number = await getRunNum()
			const add_invoice = await knex('invoice').insert({
				code_iv: null, customer_id: code_customer, name_customer, name_project_iv,
				date_iv, payment_iv, date_end_iv, refer_iv, data_praticulars_iv: data_particulars_array, amount_iv, discount_iv, sum_discount_iv,
				amount_afterdiscount_iv, total_vat_iv, total_amount_iv, run_number, note_form
			})
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.get_run_number_iv = function () {
	return async function (req, res, next) {
		try {
			const run_number = await getRunNum()

			req.result = [
				convertNumFormat(run_number),
				run_number
			]
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};
async function getRunNum() {
	// const db = await createConnection();
	const current_date = moment().add('Y', 543).format('MM/YYYY')
	// const query = await db.query(`select run_number, date_iv from invoice`)
	const query = await knex('invoice').select('run_number', 'date_iv')
	if (query.length >= 1) {
		const { run_number, date_iv } = query[query.length - 1]
		const query_date = date_iv.slice(3)
		return current_date == query_date && run_number ? run_number + 1 : 1
	} else {
		return 1
	}
}
function convertNumFormat(num) {
	if (num < 10)
		return "0000" + num
	else if (num < 100)
		return "000" + num
	else if (num < 1000)
		return "00" + num
	else if (num < 10000)
		return "0" + num
	else
		return num
}

exports.edit_invoice = function () {
	return async function (req, res, next) {
		try {
			// const db = await createConnection();
			// const name_project = await db.query(
			// 	`SELECT * FROM invoice WHERE name_project_iv ='${req.body.name_project_iv}' `
			// );
			const name_project = await knex('invoice').select().where({ name_project_iv: req.body.name_project_iv })
			let data_invoice = [];
			let data_name = req.body.name_project_iv;
			name_project.map((element, index) => {
				if (data_name === element.name_project_iv) {
					data_invoice.push({
						data_praticulars_iv: JSON.parse(element.data_praticulars_iv),
						code_iv: element.code_iv,
						customer_id: element.customer_id,
						name_customer: element.name_customer,
						name_project_iv: element.name_project_iv,
						date_iv: element.date_iv,
						payment_iv: element.payment_iv,
						date_end_iv: element.date_end_iv,
						refer_iv: element.refer_iv,
						amount_iv: element.amount_iv,
						discount_iv: element.discount_iv,
						sum_discount_iv: element.sum_discount_iv,
						amount_afterdiscount_iv: element.amount_afterdiscount_iv,
						total_vat_iv: element.total_vat_iv,
						total_amount_iv: element.total_amount_iv,
						run_number: element.run_number,
						note_form: element.note_form,
					});
				}
			});
			req.result = data_invoice;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.show_date = function () {
	return async function (req, res, next) {
		try {
			const name_project = await knex('invoice').select().where({ active_iv: 1, name_project_iv: req.body.name_project_iv }).orderBy('date_iv', 'ASC')
			let date_iv = [];
			let data_name = req.body.name_project_iv;
			name_project.map((element, index) => {
				if (data_name === element.name_project_iv) {
					date_iv.push({
						date_iv: element.date_iv,
						code_iv: element.code_iv
					});
				}
			});
			req.result = date_iv;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};
exports.update_history_iv = function () {
	return async function (req, res, next) {
		try {
			const { name_project_iv,
				data_particulars_array,
				amount_iv,
				amount_afterdiscount_iv,
				total_vat_iv,
				total_amount_iv,
				sum_discount_iv,
				discount_iv,
				refer_iv,
				date_iv,
				date_end_iv,
				payment_iv,
				note_form } = req.body
			await knex('invoice').select('').where({ code_iv: req.body.code_iv })
				.update({
					name_project_iv,
					data_praticulars_iv: data_particulars_array,
					amount_iv,
					amount_afterdiscount_iv,
					total_vat_iv,
					total_amount_iv,
					sum_discount_iv,
					discount_iv,
					refer_iv,
					date_iv,
					date_end_iv,
					payment_iv,
					note_form
				})
			const update_data = await knex('invoice').select('').where({ code_iv: req.body.code_iv })
			req.result = update_data;
			next();
		} catch (error) {
			console.log("error", error);

			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.data_history = function () {
	return async function (req, res, next) {
		try {
			const select_data = await knex('invoice').select().where({ code_iv: req.body.code_iv })
			let data_invoice = [];
			let date = req.body.date_iv;
			let code_iv = parseInt(req.body.code_iv)
			select_data.map((element, index) => {
				if (code_iv === element.code_iv) {
					data_invoice.push({
						data_praticulars_iv: JSON.parse(element.data_praticulars_iv),
						code_iv: element.code_iv,
						customer_id: element.customer_id,
						name_customer: element.name_customer,
						name_project_iv: element.name_project_iv,
						date_iv: element.date_iv,
						payment_iv: element.payment_iv,
						date_end_iv: element.date_end_iv,
						refer_iv: element.refer_iv,
						amount_iv: element.amount_iv,
						discount_iv: element.discount_iv,
						sum_discount_iv: element.sum_discount_iv,
						amount_afterdiscount_iv: element.amount_afterdiscount_iv,
						total_vat_iv: element.total_vat_iv,
						total_amount_iv: element.total_amount_iv,
						run_number: element.run_number,
						note_form: element.note_form,
					});
				}
			});
			req.result = data_invoice;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};
/////////////////////////////////////////////////////   page hs  ///////////////////////////////////////////////////// 
exports.user_get_invoice_to_hs = function () {
	return async function (req, res, next) {
		try {
			// const db = await createConnection();
			// const get_invoice = await db.query(`SELECT * FROM invoice WHERE name_customer = '${req.body.name_customer}' and name_project_iv='${req.body.name_project_iv}' `);
			const get_invoice = await knex('invoice').select().where({
				name_customer: req.body.name_customer, name_project_iv: req.body.name_project_iv,
				code_iv: req.body.code_iv
			})
			let data_name_customer = [];
			get_invoice.map(element => {
				data_name_customer.push({
					code_qt: element.code_qt,
					customer_id: element.customer_id,
					name_customer: element.name_customer,
					refer_iv: element.refer_iv,
					name_project_iv: element.name_project_iv,
					data_praticulars_iv: JSON.parse(element.data_praticulars_iv),
					amount_iv: element.amount_iv,
					discount_iv: element.discount_iv,
					sum_discount_iv: element.sum_discount_iv,
					amount_afterdiscount_iv: element.amount_afterdiscount_iv,
					total_vat_iv: element.total_vat_iv,
					total_amount_iv: element.total_amount_iv,

				});
			});
			req.result = data_name_customer;
			next();
		} catch (error) {
			console.log(error)
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.get_name_all_hs = function () {
	return async function (req, res, next) {
		try {
			const name_customer = await knex('invoice').select('name_customer', 'code_iv').groupBy('name_customer').where({ active_iv: 1 })
			req.result = name_customer;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.get_project_all_hs = function () {
	return async function (req, res, next) {
		try {
			const get_quotion = await knex('invoice').select().where({ active_iv: 1, name_customer: req.body.name_customer })
			let data_name_customer = [];
			get_quotion.map((element) => {
				data_name_customer.push({
					code_iv: element.code_iv,
					customer_id: element.customer_id,
					name_customer: element.name_customer,
					name_project_iv: element.name_project_iv,
					refer_iv: element.refer_iv

				});
			});
			req.result = data_name_customer;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

/////////////////////////////////////////////////////   page pdf  /////////////////////////////////////////////////////
exports.check_type_pdf = function () {
	return async function (req, res, next) {
		try {
			const check_type_qt = await knex('quotation').select('*').where({ active_qt: 1, name_customer: req.body.name_customer, name_project_qt: req.body.name_project_qt });
			const check_type_iv = await knex('invoice').select('*').where({ active_iv: 1, name_customer: req.body.name_customer, name_project_iv: req.body.name_project_qt });
			const check_type_hs = await knex('receipt').select('*').where({ active_hs: 1, name_customer: req.body.name_customer, name_project_hs: req.body.name_project_qt });

			req.result = [
				...check_type_qt.map(el => ({ ...el, type: 'qt' })),
				...check_type_iv.map(el => ({ ...el, type: 'iv' })),
				...check_type_hs.map(el => ({ ...el, type: 'hs' }))
			];
			next();

		} catch (error) {
			console.log(error)
		}
	}

};



exports.user_get_invoicepdf = function () {
	return async function (req, res, next) {


		try {

			const get_invoice = await knex('invoice').select('*').where({
				name_customer: req.body.name_customer, name_project_iv: req.body.name_project_iv,
				date_iv: req.body.date_iv, code_iv: req.body.code_iv
			})
			let data_name_customer = [];
			get_invoice.map((element) => {
				data_name_customer.push({
					code_iv: element.code_iv,
					customer_id: element.customer_id,
					name_customer: element.name_customer,
					name_project_iv: element.name_project_iv,
					date_iv: element.date_iv,
					payment_iv: element.payment_iv,
					date_end_iv: element.date_end_iv,
					receipt_no_iv: element.receipt_no_iv,
					refer_iv: element.refer_iv,
					data_praticulars_iv: JSON.parse(element.data_praticulars_iv),
					total_vat_iv: element.total_vat_iv,
					total_amount_iv: element.total_amount_iv,
					amount_iv: element.amount_iv,
					amount_afterdiscount_iv: element.amount_afterdiscount_iv,
					run_number: element.run_number,
					discount_iv: element.discount_iv,
					sum_discount_iv: element.sum_discount_iv,
					note_form: element.note_form

				});
			});
			req.result = data_name_customer;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.delete_pdf_iv = function () {
	return async function (req, res, next) {
		try {
			const delete_pdf = await knex('invoice').select().update({ active_iv: 0 })
				.where({ code_iv: req.body.code_delete })
			req.result = delete_pdf
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};




// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// exports.user_get_invoice = function () {
// 	return async function (req, res, next) {
// 		try {
// 			const get_invoice = await knex('invoice').select().where({ name_customer: req.body.name_customer })
// 			let data_name_customer = [];
// 			get_invoice.map((element) => {
// 				data_name_customer.push({
// 					code_iv: element.code_iv,
// 					customer_id: element.customer_id,
// 					name_customer: element.name_customer,
// 					name_project_iv: element.name_project_iv,
// 					date_iv: element.date_iv,
// 					payment_iv: element.payment_iv,
// 					date_end_iv: element.date_end_iv,
// 					receipt_no_iv: element.receipt_no_iv,
// 					refer_iv: element.refer_iv,
// 					data_praticulars_iv: JSON.parse(element.data_praticulars_iv)
// 				});
// 			});
// 			req.result = data_name_customer;
// 			next();
// 		} catch (error) {
// 			res.status(400).json({ success: false, message: error.message });
// 		}
// 	};
// };

