# Make the web!

Generator for websites based on Node.js.

# Usage

Compile index.md using [marked](https://github.com/chjj/marked):

```js
var mkweb = require('mkweb');
mkweb.make('index.md', function (error, result) {
  // process result
});
```

Compile index.md into an [ejs](https://github.com/visionmedia/ejs)-based layout template with an external scope:

```js
mkweb.make('index.md', { layout: 'main.ejs', scope: 'scope.js' }, function (error, result) {
  // process result
});
```

# Compilers

Compilers transform input into a different format. The following compilers are included in mkweb:

* ejs: [ejs](https://github.com/visionmedia/ejs)
* handlebars: [handlebars](https://github.com/wycats/handlebars.js)
* jade [jade](https://github.com/visionmedia/jade)
* md: [marked](https://github.com/chjj/marked)
* mustache: [mustache](https://github.com/janl/mustache.js)

You can create your own compiler:

```js
mkweb.registerCompiler('myextension', function (content, scope, callback) {
  // your compiler code...
  callback(null, result);
});
```

The extension string defines, which compiler is used for any given input file.

# Recipes

Recipes drive the process to generate a website. The default recipe takes the given input file, compiles it, and applies a scope and template if given.

You can create your own recipe:

```js
mkweb.registerRecipe('myRecipe', function (input, options, callback) {
  // your recipe code...
  callback(err, result);
});
mkweb.make('index.md', { recipe: 'myRecipe' }, callback);
```

Inside your recipe, you can compile a file using a registered compiler:

```js
mkweb.compile(input, scope, function (error, result) {
  // process result
});
```

Take a look at the [default recipe](https://github.com/jdiehl/mkweb/blob/master/recipes/default.js) for a working example.

# License

Copyright 2014, Jonathan Diehl

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.