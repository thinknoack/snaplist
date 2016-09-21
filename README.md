
__Install the dependencies:__

`npm install`

__Test:__

`npm test`
__When you are done, create a production ready version of the JS bundle:__

`npm run build`

__Development mode with livereload:__

`npm run watch` or just `npm start`



__Deploy on Github pages with one command:__

`npm run deploy`


`gulp build && gulp deploy`


## Fork of

[Granze React Starterify](https://github.com/Granze/react-starterify/releases/latest)


## What's new in v2.0:

- React Router integration
- CSS processing via [PostCSS](https://github.com/postcss/postcss)
  - cssnano for minification
  - nested
  - extend
  - vars
  - autoprefixer
- gulpifle written in ES6 (ES2015)
- better folder structure
- no predefined AJAX libraries (use [Fetch](https://github.com/github/fetch) or [Superagent](https://github.com/visionmedia/superagent) if you need one).
