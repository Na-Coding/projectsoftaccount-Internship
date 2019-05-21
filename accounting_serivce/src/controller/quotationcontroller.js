let knex = require("../connection/dbconnection");
let moment = require('moment')


exports.user_add_quotation = function () {
	return async function (req, res, next) {
		try {
			const {
				name_project_qt,
				date_qt,
				payment_qt,
				date_end_qt,
				refer_qt,
				code_customer,
				name_customer,
				data_particulars_array,
				amount_qt,
				discount_qt,
				sum_discount_qt,
				amount_afterdiscount_qt,
				total_vat_qt,
				total_amount_qt,
				note_form
			} = req.body;
			const run_number = await getRunNum()
			const add_quotation = await knex('quotation').insert({
				code_qt: null, customer_id: code_customer, name_project_qt
				, date_qt, payment_qt, date_end_qt, refer_qt
				, name_customer, data_praticulars_qt: data_particulars_array, amount_qt,
				discount_qt, sum_discount_qt, amount_afterdiscount_qt, total_vat_qt,
				total_amount_qt, note_form, run_number
			})
			// req.result = add_quotation;
			const test = await knex('quotation').select()
			req.result = test
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};



exports.user_get_quotation_to_iv = function () {
	return async function (req, res, next) {

		try {
			const get_quotion = await knex('quotation').select('*')
				.where(
					{
						active_qt: 1,
						name_customer: req.body.name_customer,
						name_project_qt: req.body.name_project_qt,
						code_qt: req.body.code_qt
					}
				)
			let data_name_customer = [];
			get_quotion.map(element => {
				data_name_customer.push({
					code_qt: element.code_qt,
					customer_id: element.customer_id,
					name_customer: element.name_customer,
					name_project_qt: element.name_project_qt,
					refer_qt: element.refer_qt,
					amount_qt: element.amount_qt,
					data_praticulars_qt: JSON.parse(element.data_praticulars_qt),
					discount_qt: element.discount_qt,
					sum_discount_qt: element.sum_discount_qt,
					amount_afterdiscount_qt: element.amount_afterdiscount_qt,
					total_vat_qt: element.total_vat_qt,
					total_amount_qt: element.total_amount_qt,
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

exports.get_order_quotation = function () {
	return async function (req, res, next) {
		try {

			const order_data = await knex('quotation').select('data_praticulars_qt')

			req.result = order_data;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};


exports.get_data_quotion = function () {
	return async function (req, res, next) {
		try {

			const data_quotion = await knex('quotation').select('*')
			req.result = data_quotion;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.get_name_all = function () {
	return async function (req, res, next) {
		try {

			const name_customer = await knex('quotation').select('name_customer', 'code_qt').groupBy('name_customer').where({ active_qt: 1 })
			req.result = name_customer;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};


exports.get_project_all = function () {
	return async function (req, res, next) {
		try {

			const get_quotion = await knex('quotation').select('*').where({ active_qt: 1, name_customer: req.body.name_customer })
			let data_name_customer = [];
			get_quotion.map(element => {
				data_name_customer.push({
					code_qt: element.code_qt,
					customer_id: element.customer_id,
					name_customer: element.name_customer,
					name_project_qt: element.name_project_qt,
					refer_qt: element.refer_qt

				});
			});

			req.result = data_name_customer;
			next();

		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};
exports.update_history_qt = function () {
	return async function (req, res, next) {
		try {
			const { name_project_qt,
				data_particulars_array,
				amount_qt,
				amount_afterdiscount_qt,
				total_vat_qt,
				total_amount_qt,
				sum_discount_qt,
				discount_qt,
				refer_qt,
				date_qt,
				date_end_qt,
				payment_qt,
				note_form } = req.body
			await knex('quotation').select('').where({ code_qt: req.body.code_qt })
				.update({
					name_project_qt,
					data_praticulars_qt: data_particulars_array,
					amount_qt,
					amount_afterdiscount_qt,
					total_vat_qt,
					total_amount_qt,
					sum_discount_qt,
					discount_qt,
					refer_qt,
					date_qt,
					date_end_qt,
					payment_qt,
					note_form
				})
			const update_data = await knex('quotation').select('').where({ code_qt: req.body.code_qt })
			req.result = update_data;
			next();
		} catch (error) {
			console.log("error", error);

			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.get_particulars_array = function () {
	return async function (req, res, next) {
		try {

			const particulars_array = await knex('quotation').select('data_praticulars_qt')
			const parse_array = []
			particulars_array.map((element) => {
				parse_array.push({ data_particulars: JSON.parse(element) })
			})
			req.result = parse_array;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

///////////**************PDF****************///////////////

exports.get_name_pdf = function () {
	return async function (req, res, next) {
		try {
			const all_qt = await knex('quotation').select('name_customer', 'code_qt', 'date_qt', 'name_project_qt').where({ active_qt: 1 })
			const all_inv = await knex('invoice').select('name_customer', 'code_iv as code_qt', 'date_iv', 'name_project_iv as name_project_qt').where({ active_iv: 1 })
			const all_hs = await knex('receipt').select('name_customer', 'code_hs as code_qt ', 'date_hs', 'name_project_hs as name_project_qt').where({ active_hs: 1 })

			const all_posible = [...all_qt, ...all_inv, ...all_hs].reduce((acc, el) => {
				const { name_customer, name_project_qt, date_qt, date_iv, date_hs } = el

				const indexOfName = acc.findIndex(e => e.name_customer == name_customer && e.name_project_qt == name_project_qt)

				if (indexOfName > -1) {
					acc[indexOfName].type[checktype([date_qt, date_iv, date_hs])] = true
					return [
						...acc.slice(0, indexOfName),
						{
							...el,
							type: acc[indexOfName].type
						},
						...acc.slice(indexOfName + 1)

					]
				} else {
					let arr_emp = new Array(3).fill(false)
					arr_emp[checktype([date_qt, date_iv, date_hs])] = true
					return [...acc, { ...el, type: arr_emp }]

				}

			}, [])
			// req.result = all_inv
			req.result = all_posible.map((el, i) => ({ ...el, index: i + 1 }));
			next();
		} catch (error) {
			console.log(error)
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.user_get_quotation_pdf = function () {
	return async function (req, res, next) {
		// console.log(req.body);
		try {

			const get_quotion_pdf = await knex('quotation').select('*').where({
				name_customer: req.body.name_customer,
				name_project_qt: req.body.name_project_qt,
				date_qt: req.body.date_qt,
				code_qt: req.body.code_qt
			})

			let data_name_customer = [];
			get_quotion_pdf.map(element => {
				data_name_customer.push({
					code_qt: element.code_qt,
					customer_id: element.customer_id,
					name_customer: element.name_customer,
					name_project_qt: element.name_project_qt,
					date_qt: element.date_qt,
					payment_qt: element.payment_qt,
					date_end_qt: element.date_end_qt,
					receipt_no_qt: element.receipt_no_qt,
					refer_qt: element.refer_qt,
					data_praticulars_qt: JSON.parse(element.data_praticulars_qt),
					total_vat_qt: element.total_vat_qt,
					total_amount_qt: element.total_amount_qt,
					amount_qt: element.amount_qt,
					amount_afterdiscount_qt: element.amount_afterdiscount_qt,
					run_number: element.run_number,
					discount_qt: element.discount_qt,
					sum_discount_qt: element.sum_discount_qt,
					note_form: element.note_form

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

exports.delete_pdf_qt = function () {
	return async function (req, res, next) {
		try {
			const delete_pdf = await knex('quotation').select().update({ active_qt: 0 })
				.where({ code_qt: req.body.code_delete })
			req.result = delete_pdf
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};


///////////////////////////////////////////////////////////////////////////////////////

exports.get_name_project = function () {
	return async function (req, res, next) {
		try {
			const name_project_qt = await knex('quotation').select('name_project_qt', 'code_qt')
				.where({ active_qt: 1, customer_id: req.body.code_customer })
			req.result = name_project_qt;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

exports.edit_quotation = function () {
	return async function (req, res, next) {
		try {

			const name_project = await knex('quotation').select('*').where({ name_project_qt: req.body.name_project_qt })

			let data_quotion = [];
			let data_name = req.body.name_project_qt;
			name_project.map((element, index) => {
				if (data_name === element.name_project_qt) {
					data_quotion.push({
						data_praticulars_qt: JSON.parse(element.data_praticulars_qt),
						code_qt: element.code_qt,
						customer_id: element.customer_id,
						name_customer: element.name_customer,
						name_project_qt: element.name_project_qt,
						date_qt: element.date_qt,
						payment_qt: element.payment_qt,
						date_end_qt: element.date_end_qt,
						refer_qt: element.refer_qt,
						amount_qt: element.amount_qt,
						discount_qt: element.discount_qt,
						sum_discount_qt: element.sum_discount_qt,
						amount_afterdiscount_qt: element.amount_afterdiscount_qt,
						total_vat_qt: element.total_vat_qt,
						total_amount_qt: element.total_amount_qt,
						run_number: element.run_number,
						note_form: element.note_form
					})
				}
			});

			req.result = data_quotion;
			next();
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	};
};

async function getRunNum() {
	const current_date = moment().add('Y', 543).format('MM/YYYY')
	const query = await knex('quotation').select('run_number', 'date_qt')
	if (query.length >= 1) {
		const { run_number, date_qt } = query[query.length - 1]
		const query_date = date_qt.slice(3)

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

exports.get_run_number_qt = function () {
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

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

const checktype = type => {
	if (type[0]) {
		return 0
	} else if (type[1]) {
		return 1
	} else if (type[2]) {
		return 2
	} else {
		return 3
	}
}

////////////////////////////ไม่ได้ใช้(สำรองไว้ก่อน)//////////////////////////////
// exports.user_get_quotation = function () {
// 	return async function (req, res, next) {
// 		try {

// 			const get_quotion = await knex('quotation').select('*')
// 				.where({ name_customer: req.body.name_customer })

// 			let data_name_customer = [];
// 			get_quotion.map(element => {
// 				data_name_customer.push({
// 					code_qt: element.code_qt,
// 					customer_id: element.customer_id,
// 					name_customer: element.name_customer,
// 					name_project_qt: element.name_project_qt,
// 					date_qt: element.date_qt,
// 					payment_qt: element.payment_qt,
// 					date_end_qt: moment(element.date_end_qt).format("DD/MM/YYYY"),
// 					receipt_no_qt: element.receipt_no_qt,
// 					refer_qt: element.refer_qt,
// 					data_praticulars_qt: JSON.parse(element.data_praticulars_qt),

// 				});
// 			});
// 			req.result = data_name_customer;
// 			next();
// 		} catch (error) {
// 			console.log(error)
// 			res.status(400).json({ success: false, message: error.message });
// 		}
// 	};
// };
////////////////////////////////////////////////////////////////////////////////