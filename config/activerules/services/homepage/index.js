/**
 * A middleware providing ActiveRules Nugget Object manager.
 */
function middleware(app, settings) {

    return function (conn) {

        return conn.call(app);

    }; // End the main return function
}

module.exports = middleware;