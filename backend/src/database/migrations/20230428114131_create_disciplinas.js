exports.up = function(knex) {
    return knex.schema.createTable('disciplinas', function(table){
        table.increments();
        table.string('codigo').notNullable();
        table.string('nome').notNullable();
        table.string('tipo').notNullable();
        table.string('cargaHoraria').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('disciplinas');
};
