"use strict";
/**
 * ActiveRules provides a web application server designed to support many domains running from a single instance.
 * Mach provides a kickass Promise driven HTTP library.
 *
 * License: MIT
 * Copyright 2015, Brian Winkers
 *
 * This file launches the ActiveRules server.
 * Run via the command line:
 *    node index.js
 */

/**
 * Require the Mach server code and ActiveRules modules.
 */
var mach = require('mach');
var settings = require('./config/settings').settings;
var site = require('arsite'); // ActiveRules Site configuration and magic
var lten = require('arlten'); // ActiveRules localization (l10n)
var router = require('arroute');


// Create an app using the default Mach stack
var app = mach.stack();

// Use the mach request logger @todo choose a full logger as well
app.use(mach.logger);

/**
 * Use ActiveRules Config.
 * This adds Site/Hostname based configuration.
 */
app.use(site, settings);

/**
 * Use ActiveRules Localization (L10N).
 * This provides translations and site or market specific localizations.
 */
app.use(lten, settings);

/**
 * Create routes from the API elements exposed through the Controllers configured in the settings.
 */
router.loadServices(app, settings);

/**
 * Make it Active! Active Rules!
 */
mach.serve(app);