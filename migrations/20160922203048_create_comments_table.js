
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('comments', function (table) {
    table.increments('id');
    table.text('content');
    table.integer('post_id').unsigned().index().references('id').inTable('posts').onDelete('cascade');
    table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
