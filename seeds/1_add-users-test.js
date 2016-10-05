exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'users' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'users' ).insert( {
                    id: 1,
                    username: "deezNutz",
                    first_name: "Joey",
                    last_name: "Tongay"
                } ),
                knex( 'users' ).insert( {
                    id: 2,
                    username: "booyah",
                    first_name: "Erin",
                    last_name: "Miller"
                } ),
                knex( 'users' ).insert( {
                    id: 3,
                    username: "dezBryant",
                    first_name: "Frank",
                    last_name: "Gonzo"
                } )
            ] );
        } );
};
