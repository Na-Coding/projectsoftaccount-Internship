// let createConnection = require('../connection/dbconnection');
let moment = require('moment');
let knex = require('../connection/dbconnection');



/////////////////////////////////////////////////////   page hs  ///////////////////////////////////////////////////// 
exports.user_add_receipt = function () {
	return async function (req, res, next) {
		try {
			const {
				name_project_hs,
				date_hs,
				payment_hs,
				date_end_hs,
				refer_hs,
				code_customer,
				name_customer,
				data_particulars_array,
				amount_hs,
				discount_hs,
				sum_discount_hs,
				amount_afterdiscount_hs,
				total_vat_hs,
				total_amount_hs,
				note_form,
			} = req.body;
			const run_number = await getRunNum();
			const add_receipt = await knex('receipt').insert({
				code_hs: null, customer_id: code_customer, name_customer, name_project_hs, date_hs,
				payment_hs, date_end_hs, refer_hs, data_praticulars_hs: data_particulars_array, amount_hs, discount_hs, sum_discount_hs,
				amount_afterdiscount_hs, total_vat_hs, total_vat_hs, total_amount_hs, run_number, note_form
			})
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.get_run_number_hs = function () {
	return async function (req, res, next) {
		try {
			const run_number = await getRunNum();

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
	const current_date = moment().add('Y', 543).format('MM/YYYY');
	// const query = await db.query(`select run_number, date_hs from receipt`);
	const query = await knex('receipt').select('run_number', 'date_hs')
	if (query.length >= 1) {
		const { run_number, date_hs } = query[query.length - 1];
		const query_date = date_hs.slice(3);
		return current_date == query_date && run_number ? run_number + 1 : 1;
	} else {
		return 1;
	}
}
function convertNumFormat(num) {
	if (num < 10) return '0000' + num;
	else if (num < 100) return '000' + num;
	else if (num < 1000) return '00' + num;
	else if (num < 10000) return '0' + num;
	else return num;
}

exports.get_name_project = function () {
	return async function (req, res, next) {
		try {
			const name_project_hs = await knex('receipt').select('name_project_hs', 'code_hs').where({ customer_id: req.body.code_customer }).groupBy('name_project_hs')
			req.result = name_project_hs;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.data_history_hs = function () {
	return async function (req, res, next) {
		try {
			const name_project = await knex('receipt').select().where({ code_hs: req.body.code_hs })
			let data_receipt = [];
			// let date_hs = req.body.date_hs;
			let code = parseInt(req.body.code_hs)
			// console.log(req.body.code_hs, req.body.date_hs);

			name_project.map((element, index) => {
				if (code === element.code_hs) {
					data_receipt.push({
						data_praticulars_hs: JSON.parse(element.data_praticulars_hs),
						code_hs: element.code_hs,
						customer_id: element.customer_id,
						name_customer: element.name_customer,
						name_project_hs: element.name_project_hs,
						date_hs: element.date_hs,
						payment_hs: element.payment_hs,
						date_end_hs: element.date_end_hs,
						refer_hs: element.refer_hs,
						amount_hs: element.amount_hs,
						discount_hs: element.discount_hs,
						sum_discount_hs: element.sum_discount_hs,
						amount_afterdiscount_hs: element.amount_afterdiscount_hs,
						total_vat_hs: element.total_vat_hs,
						total_amount_hs: element.total_amount_hs,
						run_number: element.run_number,
						note_form: element.note_form,
					});
				}
			});

			req.result = data_receipt;

			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};
exports.show_date_hs = function () {
	return async function (req, res, next) {
		try {
			const name_project = await knex('receipt').select().where({ active_hs: 1, name_project_hs: req.body.name_project_hs }).orderBy('date_hs', 'ASC')
			let date_hs = [];
			let data_name = req.body.name_project_hs;
			name_project.map((element, index) => {
				if (data_name === element.name_project_hs) {
					date_hs.push({
						date_hs: element.date_hs,
						code_hs: element.code_hs
					});
				}
			});
			req.result = date_hs;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};
exports.update_history_hs = function () {
	return async function (req, res, next) {
		try {
			const { name_project_hs,
				data_particulars_array,
				amount_hs,
				amount_afterdiscount_hs,
				total_vat_hs,
				total_amount_hs,
				sum_discount_hs,
				discount_hs,
				refer_hs,
				date_hs,
				date_end_hs,
				payment_hs,
				note_form } = req.body
			await knex('receipt').select('').where({ code_hs: req.body.code_hs })
				.update({
					name_project_hs,
					data_praticulars_hs: data_particulars_array,
					amount_hs,
					amount_afterdiscount_hs,
					total_vat_hs,
					total_amount_hs,
					sum_discount_hs,
					discount_hs,
					refer_hs,
					date_hs,
					date_end_hs,
					payment_hs,
					note_form
				})
			const update_data = await knex('receipt').select('').where({ code_hs: req.body.code_hs })
			req.result = update_data;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

/////////////////////////////////////////////////////   page pdf  ///////////////////////////////////////////////////// 
exports.user_get_receiptpdf = function () {
	return async function (req, res, next) {

		try {
			const get_receipt = await knex('receipt').select().where({
				name_customer: req.body.name_customer, name_project_hs: req.body.name_project_hs,
				date_hs: req.body.date_hs, code_hs: req.body.code_hs
			})
			let data_name_customer = [];
			get_receipt.map(element => {
				data_name_customer.push({
					code_hs: element.code_hs,
					customer_id: element.customer_id,
					name_customer: element.name_customer,
					name_project_hs: element.name_project_hs,
					date_hs: element.date_hs,
					payment_hs: element.payment_hs,
					date_end_hs: element.date_end_hs,
					receipt_no_hs: element.receipt_no_hs,
					refer_hs: element.refer_hs,
					data_praticulars_hs: JSON.parse(element.data_praticulars_hs),
					total_vat_hs: element.total_vat_hs,
					total_amount_hs: element.total_amount_hs,
					amount_hs: element.amount_hs,
					amount_afterdiscount_hs: element.amount_afterdiscount_hs,
					run_number: element.run_number,
					discount_hs: element.discount_hs,
					sum_discount_hs: element.sum_discount_hs
				});
			});
			req.result = data_name_customer;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.delete_pdf_hs = function () {
	return async function (req, res, next) {
		try {
			const delete_pdf = await knex('receipt').select().update({ active_hs: 0 })
				.where({ code_hs: req.body.code_delete })
			req.result = delete_pdf
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// exports.user_get_receipt = function () {
// 	return async function (req, res, next) {
// 		try {
// 			const get_receipt = await knex('receipt').select().where({ name_customer: req.body.name_customer })
// 			let data_name_customer = [];
// 			get_receipt.map(element => {
// 				data_name_customer.push({
// 					code_hs: element.code_hs,
// 					customer_id: element.customer_id,
// 					name_customer: element.name_customer,
// 					name_project_hs: element.name_project_hs,
// 					date_hs: element.date_hs,
// 					payment_hs: element.payment_hs,
// 					date_end_hs: element.date_end_hs,
// 					receipt_no_hs: element.receipt_no_hs,
// 					refer_hs: element.refer_hs,
// 					data_praticulars_hs: JSON.parse(element.data_praticulars_hs),
// 				});
// 			});
// 			req.result = data_name_customer;
// 			req.result = get_receipt;
// 			next();
// 		} catch (error) {
// 			res.status(400).json({ success: false, message: error.message });
// 		}
// 	};
// };


// exports.get_data_receipt = function () {
// 	return async function (req, res, next) {
// 		try {
// 			const db = await createConnection();
// 			const data_receipt = await db.query(`select * from receipt`);
// 			req.result = data_receipt;
// 			next();
// 		} catch (error) {
// 			res.status(400).json({ success: false, message: error.message });
// 		}
// 	};
// };

//  
