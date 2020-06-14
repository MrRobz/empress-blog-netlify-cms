'use strict';
const path = require('path');
const { EOL } = require('os');
const { existsSync } = require('fs');

module.exports = {
  description: '',

  normalizeEntityName() {
  },

  fileMapTokens: function() {
    let isAddon = this.project.isEmberCLIAddon();
    return {
      __base__() {
        if(isAddon) {
          return path.join('tests', 'dummy', 'public');
        }
        return 'public';
      }
    }
  },

  afterInstall() {
    let isAddon = this.project.isEmberCLIAddon();
    let file = isAddon? path.join('tests', 'dummy', 'app', 'index.html') : 'app/index.html';
    
    if (existsSync(file)) {
      this.ui.writeLine(`Added netlify-identity-widget import statement to ${file}`);
      this.insertIntoFile(file, '<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>', {
        before: '</body>' + EOL
      });

      this.ui.writeLine(`Adding netlifyIdentity script to ${file}`);
      this.insertIntoFile(file, `
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
      `, {
        before: '</body>' + EOL
      });
    }
  }
};
