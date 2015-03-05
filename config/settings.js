/**
 * Define settings specific to this server
 */

// Define libraries needed
var path = require('path');

exports.settings = {
    // Define the ActiveRules config root, default is a subdirectory relative to this file.
    configDir: path.join(__dirname, 'activerules'),
    fileUploadPath: 'uploads',
    "routes": {
        "home": {
            "method": "GET",
            "path": "/",
            "classMethod": "nugget.root",
            "classfile": "nugget",
            "classmethod": 'root'
        },
        "test": {
            "method": "GET",
            "path": "/test",
            "classMethod": "nugget.test",
            "classfile": "nugget",
            "classmethod": 'test'
        }
    }
}