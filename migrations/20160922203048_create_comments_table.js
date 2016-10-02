
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('comments', function (table) {
    table.increments();
    table.text('content');
    table.integer('post_id').unsigned().index().references('id').inTable('posts').onDelete('cascade');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
