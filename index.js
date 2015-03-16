"use strict";
/**
 * This launches the ActiveRules server.
 *
 * License: MIT
 *
 * Run via the command:
 *    node index.js
 */

/**
 * Require the Mach server code and ActiveRules modules.
 *
 * Mach provides a kickass Promise driven HTTP library.
 * ActiveRules provides a web application server designed to support many domains running from a single instance.
 *
 * You shouldn't change this other than adding additional middleware or removing some of the default middleware,
 */
var mach = require('mach')
    , settings = require('./config/settings').settings
    , arsite = require('arsite') // ActiveRules Site configuration and magic
    , lten = require('arlten') // ActiveRules localization (l10n)
    , nugget = require('nugget')
    , _ = require('lodash')
;

var controllers = {
    nugget: require('nugget'),
    auth: require('arauth') // ActiveRules authentication via Passport
};

// Create an app using the default Mach stack
var app = mach.stack();

// Use the mach request logger @todo choose a full logger as well
app.use(mach.logger);

/**
 * Use ActiveRules Config.
 * This adds Site/Hostname based configuration.
 */
app.use(arsite, settings);

/**
 * Use ActiveRules Localization (L10N).
 * This provides translations and site or market specific localizations.
 */
app.use(lten, settings);

/**
 * Use ActiveRules Authentication.
 * This provides authentication and authorization using Passport.
 */
//app.use(auth, settings);

/**
 * Use ActiveRules Nugget Schema.
 * This provides a base of JSON object upon which others can be built.
 */
//app.use(nugget, settings);

//##########################################################################//
// !!!!!! Add your middleware BELOW here. !!!!!!
//##########################################################################//

        // Replace this with your middleware(s)
        // Use any of the ActiveRules ones above as an example.

//##########################################################################//
// ^^^^^ Add your middleware ABOVE here. ^^^^^
//##########################################################################//

/**
 * Create routes from the API elements exposed through the Nugget module.
 */
loadRoutes(app, settings.routes);

/**
 * Make it Active! Active Rules!
 */
mach.serve(app);

//==========================================================================//
// Functions.
// You really shouldn't have to change anything below here in a normal install
//==========================================================================//

/**
 * Extract all the API elements from the Nugget JSON schema create a route for each.
 * Each Middleware route must be explicitly enabled in a site config for it to be accessed by that site.
 *
 * @param app
 */
function loadRoutes(app, routes) {


    var errObj = {
        "message": "we have an error",
        "devMessage": "they didn't use the password"
    }

    nugget.coreSchemaObject(errObj, '/schema/activerules/message.json')
        .then(function(obj){
            console.log(obj);
        }

    );

    // Loop through routes
    _.forOwn(routes, function(route) {

            // load each route
            loadRoute(app, route);
        });
}

/**
 * Load an app route, optionally provide a override method.
 *
 * @param app
 * @param route
 */
function loadRoute(app, route, method) {

    // The methods we support
    var methods = ['delete','get','head','options','post','put','trace'];

    // Scrub our method
    if(typeof method === 'undefined') {
        // If no method was passed use the route defined method(s)

        // If we have a string it represents a route for one method
        if(typeof route.method === 'string') {
            method = route.method.toLowerCase();
        }
        // If the method is an array object load a route for each method
        if(typeof route.method === 'object') {
            // Create local var for routes
            var routes = route.method;

            // Load route for each method
            for (var i in routes) {
                loadRoute(app, route, routes[i]);
            }
        }

    } else {
        // Ensure lowercase for match
        method = method.toLowerCase();
    }

    // If the method was "all" add a route for each method
    if(method === 'all') {
        for (var i in methods) {
            loadRoute(app, route, methods[i]);
        }

        return;
    }

    // Only add routes for valid methods
    if(_.includes(methods, method)) {

        switch (method) {
            case 'get':
                app.get(route.path, function (conn) {
                    return controllers[route.arController][route.arMethod](conn)
                });
                break;
            case 'post':
                app.post(route.path, function (conn) {
                    return controllers[route.arController][route.arMethod](conn)
                });
                break;
            case 'put':
                app.put(route.path, function (conn) {
                    return controllers[route.arController][route.arMethod](conn)
                });
                break;
            case 'options':
                app.options(route.path, function (conn) {
                    return controllers[route.arController][route.arMethod](conn)
                });
                break;
            case 'delete':
                app.delete(route.path, function (conn) {
                    return controllers[route.arController][route.arMethod](conn)
                });
                break;
            case 'trace':
                app.trace(route.path, function (conn) {
                    return controllers[route.arController][route.arMethod](conn)
                });
                break;
        }

        console.log('Routed ' + method.toUpperCase() + ' '  + route.path + ' to ' + route.arController + '::' + route.arMethod)

    }
}
