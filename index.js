'use strict';
const Funnel = require('broccoli-funnel');
const path = require('path');
const YAML = require('yaml');
const { BroccoliMergeFiles } = require('broccoli-merge-files');

module.exports = {
  name: require('./package').name,

  config() {
    return {
      'empress-blog-netlify-cms': {
        "backend": {
          "name": "git-gateway",
          "branch": "master"
        },
        "media_folder": "public/uploads",
        "public_folder": "/uploads",
        "collections": [
          {
            "name": "blog",
            "label": "Blog",
            "folder": "content/",
            "create": true,
            "slug": "{{year}}-{{month}}-{{day}}-{{slug}}",
            "fields": [
              {
                "name": "title",
                "label": "Title",
                "widget": "string"
              },
              {
                "name": "image",
                "label": "Image",
                "widget": "image",
                "required": false
              },
              {
                "name": "imageMeta",
                "label": "ImageMeta",
                "widget": "object",
                "collapsed": true,
                "fields": [
                  {
                    "label": "attribution",
                    "name": "attribution",
                    "widget": "string",
                    "default": "",
                    "required": false
                  },
                  {
                    "label": "attributionLink",
                    "name": "attributionLink",
                    "widget": "string",
                    "default": "",
                    "required": false
                  }
                ]
              },
              {
                "name": "featured",
                "label": "Featured",
                "widget": "boolean",
                "default": true
              },
              {
                "name": "authors",
                "label": "Authors",
                "widget": "list",
                "default": [
                  "ghost"
                ]
              },
              {
                "name": "tags",
                "label": "Tags",
                "widget": "list",
                "default": [
                  "new"
                ],
                "required": false
              },
              {
                "name": "body",
                "label": "Body",
                "widget": "markdown"
              },
              {
                "label": "Publish Date",
                "name": "date",
                "widget": "datetime",
                "format": "ddd MMM DD YYYY h:mm:ss a"
              }
            ]
          },
          {
            "name": "author",
            "label": "Author",
            "folder": "author/",
            "create": true,
            "slug": "{{name}}",
            "fields": [
              {
                "name": "name",
                "label": "Name",
                "widget": "string"
              },
              {
                "name": "id",
                "label": "Id",
                "widget": "string"
              },
              {
                "name": "image",
                "label": "Image",
                "widget": "image",
                "required": false
              },
              {
                "name": "cover",
                "label": "Cover",
                "widget": "string",
                "required": false
              },
              {
                "name": "website",
                "label": "Website",
                "widget": "string",
                "required": false
              },
              {
                "name": "twitter",
                "label": "Twitter",
                "widget": "string",
                "required": false
              },
              {
                "name": "facebook",
                "label": "Facebook",
                "widget": "string",
                "required": false
              },
              {
                "name": "location",
                "label": "Location",
                "widget": "string",
                "required": false
              },
              {
                "name": "body",
                "label": "Body",
                "widget": "markdown",
                "required": false
              }
            ]
          },
          {
            "name": "tag",
            "label": "Tag",
            "folder": "tag/",
            "create": true,
            "slug": "{{name}}",
            "fields": [
              {
                "name": "name",
                "label": "Name",
                "widget": "string"
              },
              {
                "name": "image",
                "label": "Image",
                "widget": "image",
                "required": false
              },
              {
                "name": "body",
                "label": "Body",
                "widget": "markdown",
                "required": false
              }
            ]
          }
        ]
      }
    }
  },

  preBuild() {
    let app = this._findHost();
    let options = typeof app.options === 'object' ? app.options : {};
    let addonConfig = options['empress-blog-netlify-cms'] || {};
    let baseConfig = this.project.config()[this.name];

    let mergedOptions = Object.assign({}, baseConfig, addonConfig)
    let ymlOptions = YAML.stringify(mergedOptions);
  },

  // treeForAddon(tree) {
  //   let trees = [tree];

  //   console.log(path.join(this.root, 'public', 'admin', 'config.yml'));
  //   const flattenedTranslationTree = new BroccoliMergeFiles([path.join(this.root, 'public', 'admin')], {
  //     merge: entries => { 
  //       console.log(entries);
  //       debugger
  //       const output = entries.map(([fileName, contents]) => {
  //         return ['admin-'+fileName, contents];
  //       });
  //       return output;
  //     }
  //   });

  //   return flattenedTranslationTree;
  // },

  treeForPublic() {
    console.log("tree for public called ", path.join(this.root, 'public'));
    return new Funnel(path.join(this.root, 'public'));
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
