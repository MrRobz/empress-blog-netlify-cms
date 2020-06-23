empress-blog-netlify-cms
==============================================================================
empress-blog-netlify-cms aims to integrate Netlify CMS with empress-blog.

[Empress-blog](https://github.com/empress/empress-blog) is a fully-functional, static site implementation of a blog system built on EmberJS.

[Netlify CMS](https://netlifycms.org) is a React single page app for editing git based content via API. Its built for non-technical and technical editors alike, and its super easy to install and configure.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install empress-blog-netlify-cms
```


Usage
------------------------------------------------------------------------------

* Install `empress-blog-netlify-cms` to the empress-blog project.
* Enable [Identity](https://docs.netlify.com/visitor-access/identity/#enable-identity-in-the-ui) in your netlify project.

Go to `netlify-hosted-url/admin/index.html` in browser to view the content management system.

For detailed instruction check this [blog post](https://www.mylittletechlife.com/integrate-netlify-cms-with-empress-blog).

By default addon configures Netlify CMS with [git-gateway](https://docs.netlify.com/visitor-access/git-gateway/#setup-and-settings) backend. You can change this though the addon options.

Options
------------------------------------------------------------------------------
`empress-blog-netlify-cms` aims to be zero config implementation to connect Netlify CMS with empress-blog.
But if you wish to modify or enhance the default implementation, there are a couple of options available:

### `netlify-config`
(_optional_, type: `Object`)

Use this to modify the default netlify-CMS config file. Object passed here will me be merged with the default config object.
For options available check out [netlify docs](https://www.netlifycms.org/docs/configuration-options/).

ember-cli-build.js
```javascript
  'empress-blog-netlify-cms': {
    'netlify-config: {
      "backend" {
        "name": "github",
        "repo": "owner-name/repo-name"
      }
    }
  }
```

The default netlify-CMS config config is:
```javascript
{
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
```
To view the default config in yml, click [here](https://github.com/MalayaliRobz/empress-blog-netlify-cms/blob/master/netlify-templates/config.yml). 

### `modulePath`
(_optional_, type: `string | Array<string>`, default: `undefined`)

If you need to customize Netlify CMS, e.g. registering [custom widgets](https://www.netlifycms.org/docs/custom-widgets/#registerwidget) or
styling the [preview pane](https://www.netlifycms.org/docs/customization/#registerpreviewstyle),
you'll need to do so in a JavaScript file and provide empress-blog-netlify-cms with the path to
your file via the `modulePath` option.

ember-cli-build.js
```javascript
  'empress-blog-netlify-cms': {
    modulePath: `${__dirname}/custom-netlify-script.js`
  }
```
The js file might look like this:

```
CMS.registerPreviewStyle("/example.css");
```

### `publicPath`
(_optional_, type: `string`, default: `"admin"`)

Customize the path to Netlify CMS on your Empress site.

### `disableIdentityScriptInIndex`
(_optional_, type: `boolean`, default: `false`)

By default `empress-blog-netlify-cms` adds [netlify-identity-widget](https://github.com/netlify/netlify-identity-widget) to your index page of the project for netlify user activation mails to work. Pass false if you wish to disable this.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
