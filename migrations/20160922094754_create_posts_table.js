
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('posts', function(table){
      table.increments();
      table.string('title');
      table.string('body');
      table.timestamps(true, true);
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
