# MyTravis [![Build Status](https://travis-ci.org/lquixada/my-travis.png?branch=master)](https://travis-ci.org/lquixada/my-travis)

Monitor your projects builds from TravisCI within Chrome. 


## Installation

1. Go to the [Chrome Web Store](https://chrome.google.com/webstore/detail/my-travis/ddlafmkcenhiahiikbgjemcbdengmjbg) using the Google Chrome web browser.
2. Click on the "add to the chrome" button.
3. If you see a red icon with a T in the middle, you've made it.


## Usage

Click on the red T button and a window will popup. There exists a cog icon. Click it and
you will see a very short form. Type your travisci user and some polling interval in seconds,
say 30. MyTravis will fetch all the projects related to that user along with some info.

That's it! Every time one of the builds fails, a red badge will show up. Otherwise, it will
turn green.


## Screenshots

(to be done)


## Development

### Installing Tools

```bash
$ npm install
```


### Tests

```bash
$ npm test
```


## Credits & License

Copyright (c) 2013 Leonardo Quixada ([@lquixada](http://twitter.com/lquixada)). This software is licensed under the MIT License.
