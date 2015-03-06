/**
 * Define settings specific to this server
 */

// Define libraries needed
var path = require('path');

exports.settings = {

    // Define the version
    version: '0.1.0',

    // The extension used for JSON files
    jsonExt: '.json',

    // Define the ActiveRules config root, default is a subdirectory relative to this file.
    configDir: path.join(__dirname, 'activerules'),

    "routes": {
        "home": {
            "method": "GET",
            "path": "/",
            "arController": "nugget",
            "arMethod": 'root'
        },
        "test": {
            "method": "GET",
            "path": "/test",
            "arController": "nugget",
            "arMethod": 'test'
        }
    }
}