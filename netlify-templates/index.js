const { readFileSync } = require('fs');

module.exports = (
  modulePath
) => {
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Netlify CMS -->
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
    
    ${pasteModuleScripts(modulePath)}

  </body>
  </html>
  `;
};

function pasteModuleScripts(modulePath) {
  if (modulePath) {
    if (Array.isArray(modulePath)) {
      return modulePath.map(file => pasteInScriptTag(file)).join("\n");
    } else {
      return pasteInScriptTag(modulePath);
    }
  }
}

function pasteInScriptTag(modulePath) {
  let data = readFileSync(modulePath, 'utf8');
  
  return `
   <script>
     ${data}
   </script>
  `;
}