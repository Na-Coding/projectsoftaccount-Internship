const bcypt = require('bcrypt')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_table').insert({
          username : 'admin',
          password : bcypt.hashSync('12345',10),
          type : 'admin'
      });
    });
};
