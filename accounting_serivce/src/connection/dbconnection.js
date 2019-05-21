// var mysql = require('promise-mysql');

// const createConnection = () =>
// 	mysql
// 		.createConnection({
// 			host: '127.0.0.1',
// 			user: 'root',
// 			password: '1234',
// 			database: 'projectsoft_accounting',
// 		})
// 		.then(con => con);

// // con.connect(function(err) {
// //   if (err) throw err;
// //   console.log(con.state)
// // });

// module.exports = createConnection;
console.log(__dirname);
const path = require('path')
const knexfile = require('../../knexfile')


var knex = require('knex')(knexfile[process.env.NODE_ENV])

module.exports = knex
