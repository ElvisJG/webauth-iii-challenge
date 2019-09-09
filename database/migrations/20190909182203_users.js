// Creates users table with an auto-incrementing ID, a username (128 chars, required, unique)
// and a password (128 chars, required)
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .string('username', 128)
      .notNullable()
      .unique();
    users.string('password', 128).notNullable();
    users.string('department', 128).notNullable();
  });
};

// Deletes users table
exports.down = function(knex) {
  return knex.schema.dropTablesIfExists('users');
};
