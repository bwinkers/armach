/**
 * A middleware providing ActiveRules Nugget Object manager.
 * Built on top of Passport.
 */
function middleware(app, settings) {

    return function (conn) {

        return conn.call(app);

    }; // End the main return function
}

module.exports = middleware;