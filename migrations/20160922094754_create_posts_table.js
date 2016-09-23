
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('posts', function(table){
      table.increments('id');
      table.text('title');
      table.text('body');
      table.timestamps(true, true);
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('cascade');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
