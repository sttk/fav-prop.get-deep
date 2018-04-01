# [@fav/prop.get-deep][repo-url] [![NPM][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage status][coverage-img]][coverage-url]

Gets a property value in property tree of an object with a property path.

> "fav" is an abbreviation of "favorite" and also the acronym of "for all versions".
> This package is intended to support all Node.js versions and many browsers as possible.
> At least, this package supports Node.js >= v0.10 and major Web browsers: Chrome, Firefox, IE11, Edge, Vivaldi and Safari.


## Install

To install from npm:

```sh
$ npm install --save @fav/prop.get-deep
```

***NOTE:*** *npm < 2.7.0 does not support scoped package, but even old version Node.js supports it. So when you use such older npm, you should download this package from [github.com][repo-url], and move it in `node_modules/@fav/prop.get-deep/` directory manually.*


## Usage

```js
var getDeep = require('@fav/prop.get-deep');
getDeep({ a: 1, b: { c: 3, d: 4 }, e: 5 }, ['b', 'c']); // => 3
```

For Web browsers:

```js
<script src="fav.prop.omit-deep.min.js"></script>
<script>
var getDeep = fav.prop.getDeep;
getDeep({ a: 1, b: { c: 3, d: 4 }, e: 5 }, ['b', 'c']); // => 3
</script>
```


## API

### <u>getDeep(obj, propPath) : *any*</u>

Gets a property value in property tree of an object with a property path.

A property path is an array of keys/symbols which are passed from root to a target property in property tree of *obj* object.
For example, the property path of `c` in `{ a: { b: { c: 1 } } }` is `['a', 'b', 'c']`.

This function is targeted at all properties, which are enumerable and unenumerable, own and inherited.

***NOTE:*** *All versions of Node.js allows to use a string array for getting or setting property, like `obj[['a','b']] == obj['a,b']`. An Symbol array is allowed as same until v4, but is not allowed on v5 and later (TypeError is thrown).
To support same behaviors for all versions, this function does not allow to use an array as a property. (Thus, a property path needs to be always one dimensional array).*

**Parameters:**

| Parameter   | Type   | Description                         |
|:------------|:------:|:------------------------------------|
| *src*       | object | A source object.                    |
| *propPath*  | Array  | A property path of keys and symbols |

**Returns:**

A property value of a specified property path.


## Checked                                                                      

### Node.js (4〜9)

| Platform  |   4    |   5    |   6    |   7    |   8    |   9    |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### io.js (1〜3)

| Platform  |   1    |   2    |   3    |
|:---------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|

### Node.js (〜0.12)

| Platform  |  0.7   |  0.8   |  0.9   |  0.10  |  0.11  |  0.12  |
|:---------:|:------:|:------:|:------:|:------:|:------:|:------:|
| macOS     |        |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Windows10 |        |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|&#x25ef;|

### Web browsers

| Platform  | Chrome | Firefox | Vivaldi | Safari |  Edge  | IE11   |
|:---------:|:------:|:-------:|:-------:|:------:|:------:|:------:|
| macOS     |&#x25ef;|&#x25ef; |&#x25ef; |&#x25ef;|   --   |   --   |
| Windows10 |&#x25ef;|&#x25ef; |&#x25ef; |   --   |&#x25ef;|&#x25ef;|
| Linux     |&#x25ef;|&#x25ef; |&#x25ef; |   --   |   --   |   --   |


## License

Copyright (C) 2017 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[repo-url]: https://github.com/sttk/fav-prop.get-deep/
[npm-img]: https://img.shields.io/badge/npm-v1.0.3-blue.svg
[npm-url]: https://www.npmjs.com/package/@fav/prop.get-deep
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses/MIT
[travis-img]: https://travis-ci.org/sttk/fav-prop.get-deep.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/fav-prop.get-deep
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/fav-prop.get-deep?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/fav-prop-get-deep
[coverage-img]: https://coveralls.io/repos/github/sttk/fav-prop.get-deep/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/sttk/fav-prop.get-deep?branch=master
