
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('posts', function(table){
      table.increments('id');
      table.text('post_text');
      table.timestamps(true, true);
      table.integer('user_id');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
};
