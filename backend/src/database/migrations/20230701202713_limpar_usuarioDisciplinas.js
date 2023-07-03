exports.up = function(knex) {
    return knex('usuarioDisciplinas').del() // limpa os dados da tabela
      .then(() => {
        return knex.schema.table('usuarioDisciplinas', function(table) {
          table.string('tipo'); // adiciona a coluna 'tipo'
        });
      });
  };
  
  exports.down = function(knex) {
    // Faz nada
  };
  