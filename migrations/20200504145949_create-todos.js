
exports.up = function (knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments();
    table.string('name');
    table.string('description');
    table.enu('status', ['new', 'in-progress', 'done']);
    table.integer('userId').unsigned().references('users.id');
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('todos');
};
