// Require the Mach server code
var mach = require('mach')
    , settings = require('./config/settings').settings
    , activerules = require('activerules')
    , nugget = require('nugget');

// Create an app using the default Mach stack
var app = mach.stack();

// Use the mach logger in the app
app.use(mach.logger);

// Use ActiveRules
app.use(activerules, settings);

app.get('/', function (request) {
    return nugget.root(request)
});

// Start the app server
mach.serve(app);