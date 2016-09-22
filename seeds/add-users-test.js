
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: "deezNutz"}),
        knex('users').insert({username: "booyah"}),
        knex('users').insert({username: "booyarrrr"})
      ]);
    });
};
