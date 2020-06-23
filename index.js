'use strict';
const YAML = require('yaml');
const writeFile = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const { readFileSync } = require('fs');
const netlifyIndexGenerator = require('./netlify-templates/index');

module.exports = {
  name: require('./package').name,

  getAddonOptions() {
    let app = this._findHost();
    let options = typeof app.options === 'object' ? app.options : {};
    
    return options['empress-blog-netlify-cms'] || {};
  },

  treeForPublic() {
    let addonConfig = this.getAddonOptions();
    let publicPath = addonConfig.publicPath || 'admin';
    let modulePath = addonConfig.modulePath;
    
    let netlifyConfigJson = YAML.parse(readFileSync('./netlify-templates/config.yml', 'utf8'));
    Object.assign(netlifyConfigJson, addonConfig['netlify-config'] || {});
    let netlifyConfigOutputYml = YAML.stringify(netlifyConfigJson);

    const netlifyConfigTree = writeFile(
      `${publicPath}/config.yml`,
      netlifyConfigOutputYml
    );
    
    const netlifyIndexHtmlTree = writeFile(
      `${publicPath}/index.html`,
       netlifyIndexGenerator(modulePath)
    );

    return mergeTrees([netlifyConfigTree, netlifyIndexHtmlTree]);
  },

  contentFor(type) {
    let addonConfig = this.getAddonOptions();
    let publicPath = addonConfig.publicPath || 'admin';

    if (!addonConfig.disableIdentityScriptInIndex) {
      if (type === 'head-footer') { 
        return '<script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>';
      }
  
      if (type === 'body-footer') {
        return (`
          <script>
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/${publicPath}/";
                  });
                }
              });
            }
          </script>
        `);
      }
    }
  }
};
