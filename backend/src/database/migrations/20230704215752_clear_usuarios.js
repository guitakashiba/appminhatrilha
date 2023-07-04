exports.up = function(knex) {
    return knex('usuarios').del();
};

exports.down = function(knex) {

};
