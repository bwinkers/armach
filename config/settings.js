/**
 * Define settings specific to this server
 */

// Define libraries needed
var path = require('path');

exports.settings = {
    // Define the ActiveRules config root, default is a subdirectory relative to this file.
    configDir: path.join(__dirname, 'activerules'),
    fileUploadPath: 'uploads'
}