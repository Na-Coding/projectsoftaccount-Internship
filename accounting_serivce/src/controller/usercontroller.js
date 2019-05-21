let knex = require('../connection/dbconnection')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let saltRounds = 10;

exports.user_login = function () {
    return async function (req, res, next) {
        try {
            const user = await knex('user_table').first('user_id', 'type', 'password')
                .where({ username: req.body.username })
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const { user_id, type } = user
                    const token = jwt.sign({ user_id, type }, 'key')
                    req.result = token
                    next()
                }
                else {
                    res.status(400).json({ success: false, message: 'ชื่อผู้ใช้และรหัสผ่านไม่ตรงกัน' });
                }
            }
            else {
                res.status(400).json({ success: false, message: 'user not found' });
            }
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.change_password = function () {
    return async function (req, res, next) {
        try {
            const password = await knex('user_table').select('password').where({ user_id: req.user_id })
            bcrypt.compare(req.body.oldpassword, password[0].password).then(function (result) {
                if (result) {
                    bcrypt.hash(req.body.newpassword, saltRounds, async function (err, hash) {
                        const newpassword = await knex('user_table').where({ user_id: req.user_id }).update({ password: hash })
                        next()
                    });
                } else {
                    res.status(202).json({ success: false, message: "password not match" });
                }
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
};