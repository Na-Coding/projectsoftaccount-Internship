
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_table', table => {
      table.increments('user_id').primary()
      table.string('username',100)
      table.string('password', 100)
      table.enu('type', ["admin"]).defaultTo('admin')
  })
};

exports.down = function(knex, Promise) {
  
};
