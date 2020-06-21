'use strict';
const Funnel = require('broccoli-funnel');
const path = require('path');
const YAML = require('yaml');
const Plugin = require('broccoli-plugin');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');

module.exports = {
  name: require('./package').name,

  treeForPublic() {
    let app = this._findHost();
    let options = typeof app.options === 'object' ? app.options : {};
    let addonConfig = options['empress-blog-netlify-cms'] || {};

    let funnel = new Funnel(path.join(this.root, 'public', 'admin'));
    return new NetlifyCMSFiles([ funnel ], {
      netlifyConfig: addonConfig['netlify-config'] || {}
    });
  },

  contentFor(type) {
    if (type === 'head-footer') { 
      return '<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>';
    }

    if (type === 'body-footer') {
      return (`
        <script>
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        </script>
      `);
    }
  }
};

class NetlifyCMSFiles extends Plugin {
  constructor(inputNode, options) {
    super(...arguments);

    this.options = options;
  }

  build() {
    let netlifyHtml = readFileSync(path.join(this.inputPaths[0], 'index.html'), { encoding:'utf8' });
    let defaultNetlifyConfigYml = readFileSync(path.join(this.inputPaths[0], 'config.yml'), { encoding:'utf8' });

    let netlifyConfigJson = YAML.parse(defaultNetlifyConfigYml);
    Object.assign(netlifyConfigJson, this.options.netlifyConfig);
    let netlifyConfigOutputYml = YAML.stringify(netlifyConfigJson);

    mkdirSync(path.join(this.outputPath, 'admin'));
    writeFileSync(path.join(this.outputPath, 'admin', 'index.html'), netlifyHtml, { encoding:'utf8' });
    writeFileSync(path.join(this.outputPath, 'admin', 'config.yml'), netlifyConfigOutputYml, { encoding:'utf8' });
  }
}
