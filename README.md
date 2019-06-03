angular-template-cache
======================

[![Build Status](https://travis-ci.org/pchudzik/angular-template-cache.svg?branch=master)](https://travis-ci.org/pchudzik/angular-template-cache)
[![dependencies Status](https://david-dm.org/pchudzik/angular-template-cache/status.svg)](https://david-dm.org/pchudzik/angular-template-cache)
[![devDependencies Status](https://david-dm.org/pchudzik/angular-template-cache/dev-status.svg)](https://david-dm.org/pchudzik/angular-template-cache?type=dev)

Requires all your html files and adds to angular $templateCache in single file. Similar to original angular-template-cache but requires files instead of printing the html, so that webpack can stil handle the html files itself.
 
**Features**
* can be run from command line (for example as npm script)
* can be required from another script
* can print output to stdout or to a file
* allows to define you own prefix and suffix
* should generate valid js file (no more .jshintignore)
* has support for typescript

Usage
=====

**Command line**

Usage:
``` nghtml2js [options] -- [fileList...] ```

Examples:
```
node_modules/.bin/nghtml2js -m 'reporter.template' -s es2015 -f 'src/**/*.html' -p src/ -o src/template.js
node_modules/.bin/nghtml2js -m 'reporter.template' -s es2015 -f -p src/ -o src/template.js -- src/file1.html src/file2.htm
node_modules/.bin/nghtml2js   # will load all **html files from current folder 
```
More examples can be found in [tests](test-it/cmd.spec.js)


**Options:**

``` fileList ```
files to put in templateCache. File list must be provided after ```--```

```-f, --files <glob pattern>``` 
Glob (https://github.com/isaacs/node-glob) pattern to find html files. To make it work in console you must put pattern in quote. Otherwise bash will break pattern

When input file list is provided and glob pattern is present then files found for glob pattern and input files will be merged.

```-o, --output [output file]```
File in which output should be saved (will overwrite existing file content). Will print to console if not file provided.

```-p, --key-path-prefix [path]```
Key path prefix to be used in your html files put into $templateCache service.

```-v, --value-path-prefix [path]```
Value path prefix to be used in your html files put into $templateCache service.

```-i, --ignore-missing```
Do not fail when file from fileList doesn't exist or can not be loaded. When option is active missing files will not be present in generated template file  

```-m, --module-name```
Name of the module to import in your application. 'templates' is default module name.

```--service-type [service type]```
The Typescript type of the AngularJS $templateCache service, to generate a file compliant with strict Typescript settings.

``` --no-new-module ```
should skip new module creation. Will generate: ```.module('templates')```
By default new module is created: ```.module('templates', [])```

``` --no-strict ```
Skip ```'use strict';``` in generated file
 
``` --header [header content] ```
Custom header in the generated file. Just below use strict.
 
``` --prefix ```
Custom prefix to be used in code.
When provided ```--module``` and ```--no-new-module``` options are ignored
Default prefix depends on ```--style```
for browser: 
```
angular
  .module(/*...*/)
  .run(/*...*/);
```
for browserify:
```
var templatesModule = require('angular')
  .module(/*...*/)
  .run(/*...*/);
  
module.exports = templatesModule;
```
for es2015:
```
import angular from 'angular';

const templatesModule = angular
     .module(/*...*/)
     .run(/*...*/);
     
export default templatesModule;
```
  
``` --suffix [suffix] ```
Custom suffix to be used in code.
Default prefix depends on ```--style``` option
 
``` --quotmark [quotmark type] ```
qutotation mark to use in generated code. Possible options: single|double
single by default
 
``` --whitespace [whitespace type]```
Whitespace to use. Possible options: tabs|spaces
tabs bt default
 
``` -h, --help ```
prints help
 
``` -s, --style [style] ```
Code style to generate. Possible options are:

browser:

```
'use strict';

// file automatically generated by angular-template-cache

angular
.module('templates', [])
.run(['$templateCache', function($templateCache) {
    $templateCache.put('test-it/first.html', require('test-it/first.html'));

    $templateCache.put('test-it/second.html', require('test-it/second.html'));
}
]);
```

browserify:

```
'use strict';

// file automatically generated by angular-template-cache

var templatesModule = require('angular')
.module('templates', [])
.run(['$templateCache', function($templateCache) {
    $templateCache.put('test-it/first.html', require('test-it/first.html'));

    $templateCache.put('test-it/second.html', require('test-it/second.html'));
}
}
]);

module.exports = templatesModule;
```

es2015:

```
'use strict';

// file automatically generated by angular-template-cache

import angular from 'angular';

const templatesModule = angular
.module('templates', [])
.run(['$templateCache', function($templateCache) {
    $templateCache.put('test-it/first.html', require('test-it/first.html'));

    $templateCache.put('test-it/second.html', require('test-it/second.html'));
}
}
]);

export default templatesModule;
```

Changes
=======
**1.3.2**
* Removed security warnings from npm audit (thx [@Ersel Aker](https://github.com/ersel))
* Dropped support for nodejs 0.12 and 4.x

**1.3.1**

* Readme updateds (thx [@Brent Douglas](https://github.com/BrentDouglas))
* dependencies update

**1.3.0**

* added option service-type - typescript type of the AngularJS $templateCache service (thx [@lmartorella](https://github.com/lmartorella))
* dependencies update

**1.2.0**

* specify list of files (#3) - file list to be transofmred can be provided instead fo glob pattern
* --ignore-missing option added. In case of file can not be read, or doesn't exists it's possible to proceed with template.js generation

**1.1.0**

Html minification supoort

**1.0.1**

Readme fixtures

**1.0.0**

Initial release
