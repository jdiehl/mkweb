'use strict';

// load bundled compilers
require('./compilers/ejs');
require('./compilers/marked');

// load bundled recipes
require('./recipes/default');

// export mkweb
module.exports = require('./lib/mkweb');
