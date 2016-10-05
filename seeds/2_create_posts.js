exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'posts' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'posts' ).insert( {
                    id: 1,
                    title: 'I did stuff',
                    body: 'Look at all of the things I did!',
                    user_id: knex.select( 'id' ).from( 'users' ).where( 'username', 'deezNutz' )
                } ),
                knex( 'posts' ).insert( {
                    id: 2,
                    title: 'Check it out yall',
                    body: 'Really tho....',
                    user_id: knex.select( 'id' ).from( 'users' ).where( 'username', 'booyah' )
                } ),
                knex( 'posts' ).insert( {
                    id: 3,
                    title: 'What',
                    body: 'Am I doing again?',
                    user_id: knex.select( 'id' ).from( 'users' ).where( 'username', 'deezNutz' )
                } )
            ] );
        } );
};
