empress-blog-netlify-cms
==============================================================================
empress-blog-netlify-cms aims to integrat Netlify CMS with empress-blog.

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
* Enable "Identity" in your netlify prject. More info [here](https://docs.netlify.com/visitor-access/identity/#enable-identity-in-the-ui)
By default Netlify CMS config is set to [git-gateway](https://docs.netlify.com/visitor-access/git-gateway/#setup-and-settings) you can change it though addon options.

Options
------------------------------------------------------------------------------
`empress-blog-netlify-cms` aims to be zero config implementation to connect Netlify CMS with empress-blog.
But if you wish to modify or enhance the default implementation, there are a couple of options available:

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
