let knex = require("../connection/dbconnection");

exports.user_get_customer = function () {
  return async function (req, res, next) {
    try {
      const name_customer = await knex('customer').select().where({ name_customer: req.body.name_customer })
      let customer_id = [];
      let data_name = req.body.name_customer;
      name_customer.map((element) => {
        if (data_name === element.name_customer) {
          customer_id.push(element)
        }
      });
      req.result = customer_id;
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
};

exports.user_get_name_customer = function () {
  return async function (req, res, next) {
    try {
      const get_name_customer = await knex('customer').select('').where({ code_customer: req.body.code_customer })
      req.result = get_name_customer;
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
};

exports.user_add_customer = function () {
  return async function (req, res, next) {
    const { user_id } = req
    try {
      const {
        customer_type,
        initials_customer,
        name_customer,
        tax_ident_cm,
        phone_customer,
        branch_cm,
        address_customer
      } = req.body;
      await knex('customer').insert({
        customer_type, initials_customer, name_customer, tax_ident_cm, phone_customer, branch_cm, address_customer, id_user: user_id
      })
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
};


exports.get_code_customer = function () {
  return async function (req, res, next) {
    try {
      const code_customer = await knex('customer').select('code_customer')

      req.result = code_customer.length > 0 ? code_customer[code_customer.length - 1].code_customer + 1 : 1;
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
};

exports.get_name_all = function () {
  return async function (req, res, next) {
    try {

      const name_customer = await knex('customer').select('name_customer').where({ active: 1 })

      req.result = name_customer;
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
};

exports.get_data = function () {
  return async function (req, res, next) {
    try {
      const data1 = await knex('customer').select('customer.code_customer', 'customer.name_customer', 'quotation.name_project_qt', 'invoice.name_project_iv', ' receipt.name_project_hs')
        .leftJoin('quotation', { 'customer.code_customer': 'quotation.customer_id ', 'customer.active': 'quotation.active_qt' })
        .leftJoin('invoice', { 'customer.code_customer': 'invoice.customer_id', 'customer.active': 'invoice.active_iv' })
        .leftJoin('receipt', { 'customer.code_customer': 'receipt.customer_id', 'customer.active': 'receipt.active_hs' })
        .groupBy('customer.code_customer')
        .orderBy('customer.code_customer', 'ASC')
        .where({ active: 1 })
      req.result = data1;
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
};


exports.page_edit_customer = function () {
  return async function (req, res, next) {
    try {
      const edit_data_show = await knex('customer').select().where({ code_customer: req.body.code_customer })
      req.result = edit_data_show
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

};

exports.update_datacustomer = function () {
  return async function (req, res, next) {
    try {
      const {
        customer_type,
        initials_customer,
        name_customer,
        tax_ident_cm,
        phone_customer,
        branch_cm,
        address_customer,

      } = req.body;

      await knex('customer').select().where({ code_customer: req.body.code_customer })
        .update({
          customer_type,
          initials_customer,
          name_customer,
          tax_ident_cm,
          phone_customer,
          branch_cm,
          address_customer
        })
      const update_data = await knex('customer').select().where({ code_customer: req.body.code_customer })
      req.result = update_data
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
};
exports.delete_information = function () {
  return async function (req, res, next) {
    try {
      const delete_information = await knex('customer').select().update({ active: 0 })
        .where({ code_customer: req.body.code_customer })
      req.result = delete_information
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

};


/////////////////////////////////////////////////////////////////////////////////////////////////////////
