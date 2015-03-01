// Require the Mach server code
var mach = require('mach')
    , settings = require('./config/settings').settings
    , arconfig = require('arconfig')
    , lten = require('arlten')
    , auth = require('arauth')
    , route = require('arroute')
    , nugget = require('nugget');

// Create an app using the default Mach stack
var app = mach.stack();

// Use the mach request logger @todo choose a full logger as well
app.use(mach.logger);

// Use ActiveRules Config
// This add Site/Hostname based configuration, localization and routing.
app.use(arconfig, settings);

// Use ActiveRules Localization (L10N)
app.use(lten, settings);

// Use ActiveRules authentication
app.use(auth, settings);

// Use ActiveRules Routing
app.use(route, settings);

app.get('/', function (request) {
    return nugget.root(request)
});

// Start the app server
mach.serve(app);