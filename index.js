'use strict';

module.exports = {
  name: require('./package').name,

  contentFor: function(type, config) {
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
  },
};
