'use strict';

// load bundled compilers
require('./compilers/ejs');
require('./compilers/handlebars');
require('./compilers/pug');
require('./compilers/marked');
require('./compilers/mustache');

// load bundled recipes
require('./recipes/default');

// export mkweb
module.exports = require('./lib/mkweb');
