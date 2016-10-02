exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'comments' ).del()
        .then( function () {
            return Promise.all( [
                // Inserts seed entries
                knex( 'comments' ).insert( {
                    id: 1,
                    content: 'This is a test',
                    post_id: knex.select('id').from('posts'),
                } ),
                knex( 'comments' ).insert( {
                    id: 2,
                    content: 'Put the lime in the coconut',
                    post_id: knex.select('id').from('posts'),
                } ),
                knex( 'comments' ).insert( {
                    id: 3,
                    content: 'If a cornerback could catch, they would be wide receivers.',
                    post_id: knex.select('id').from('posts'),
                } )
            ] );
        } );
};
