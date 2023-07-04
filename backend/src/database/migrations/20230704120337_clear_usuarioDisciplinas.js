exports.up = function(knex) {
    return knex.schema.table('usuarioDisciplinas', function (table) {
        table.dropColumn('tipo');
    }).then(() => knex('usuarioDisciplinas').delete());
};

exports.down = function(knex) {
    return knex.schema.table('usuarioDisciplinas', function (table) {
        table.string('tipo');
    });
};
