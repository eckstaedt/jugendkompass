
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-file-opener2.FileOpener2",
          "file": "plugins/cordova-plugin-file-opener2/www/plugins.FileOpener2.js",
          "pluginId": "cordova-plugin-file-opener2",
        "clobbers": [
          "cordova.plugins.fileOpener2"
        ]
        },
      {
          "id": "com-sarriaroman-photoviewer.PhotoViewer",
          "file": "plugins/com-sarriaroman-photoviewer/www/PhotoViewer.js",
          "pluginId": "com-sarriaroman-photoviewer",
        "clobbers": [
          "PhotoViewer"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "com-sarriaroman-photoviewer": "1.2.4",
      "cordova-plugin-file-opener2": "3.0.5"
    };
    // BOTTOM OF METADATA
    });
    