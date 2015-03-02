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
    , arconfig = require('arconfig') // ActiveRules config
    , lten = require('arlten') // ActiveRules localization (l10n)
    , auth = require('arauth') // ActiveRules authentication via Passport
    , nugget = require('nugget');  // ActiveRules Nugget JSOn schema

// Create an app using the default Mach stack
var app = mach.stack();

// Use the mach request logger @todo choose a full logger as well
app.use(mach.logger);

/**
 * Use ActiveRules Config.
 * This adds Site/Hostname based configuration.
 */
app.use(arconfig, settings);

/**
 * Use ActiveRules Localization (L10N).
 * This provides translations and site or market specific localizations.
 */
app.use(lten, settings);

/**
 * Use ActiveRules Authentication.
 * This provides authentication and authorization using Passport.
 */
app.use(auth, settings);

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
loadControllers(app);

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
function loadControllers(app) {

    /**
     * We always need a route for the root.
     *
     * The templates, javascript,css and localization for the homepage are configured per site.
     * This allows us to use one route for all sites and still provide different content.
     */
    app.get('/', function (request) {

        // Send the
        return nugget.root(request)
    });

}