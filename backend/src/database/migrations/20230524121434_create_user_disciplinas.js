exports.up = function(knex) {
    return knex.schema.createTable('usuarioDisciplinas', function(table) {
      table.integer('userId').unsigned().notNullable();
      table.integer('disciplinaId').unsigned().notNullable();
      table.primary(['userId', 'disciplinaId']); // define a combinação userId-disciplinaId como chave primária
      table.foreign('userId').references('id').inTable('usuarios');
      table.foreign('disciplinaId').references('id').inTable('disciplinas');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('usuarioDisciplinas');
  };
  