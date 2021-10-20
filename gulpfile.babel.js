import { src, dest, watch, series, parallel } from 'gulp';
import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import pug from 'gulp-pug';

//JS
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import yargs from 'yargs';

//CSS
import autoprefixer from 'autoprefixer';
import cleanCss from 'gulp-clean-css';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import purgecss from 'gulp-purgecss';
import sourcemaps from 'gulp-sourcemaps';

const PRODUCTION = yargs.argv.prod;
const server = browserSync.create();
const sass = gulpSass(dartSass);

const PUBLIC_DIR = 'public';
const SOURCE_DIR = 'src';
const DEST_DIR = `${PUBLIC_DIR}/dist`;

export const serve = done => {
  server.init({
    server: PUBLIC_DIR,
    port: 5050,
  });
  done();
};

export const reload = done => {
  server.reload();
  done();
};

export const styles = () => {
  return src(`${SOURCE_DIR}/scss/style.scss`)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(cleanCss({ compatibility: 'ie10' }))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(DEST_DIR))
    .pipe(server.stream());
};

export const stylesClearUnused = () => {
  return src(`${PUBLIC_DIR}/**/*.css`)
    .pipe(
      purgecss({
        content: [`${PUBLIC_DIR}/**/*.html`, `${PUBLIC_DIR}/**/*.js`],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      })
    )
    .pipe(dest(`${PUBLIC_DIR}`));
};

export const scripts = () => {
  return src(`${SOURCE_DIR}/js/scripts.js`)
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [],
                },
              },
            },
          ],
        },
        mode: 'production',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: 'bdf.min.js',
        },
      })
    )
    .pipe(dest(DEST_DIR));
};

export const scriptsLint = () => {
  return src([`${SOURCE_DIR}/js/**/*.js`])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format());
};

export const buildHTML = () => {
  // the folders with a ! in the front are ignored from the bulding tooling so they won't generate HTMLs
  // because they're components, partials, or content
  // any other folder containing .pug that shouldn't turn into HTMLs, must be explicitly specified below

  return src([
    'templates/**/*.pug',
    '!templates/partials/**/*.pug',
    '!templates/content/**/*.pug',
  ])
    .pipe(pug({ pretty: false }))
    .pipe(dest(PUBLIC_DIR));
};

export const watchForChanges = () => {
  watch(`${SOURCE_DIR}/scss/**/*.scss`, styles);
  watch(`${SOURCE_DIR}/js/**/*.js`, series(scriptsLint, scripts, reload));
  watch(`templates/**/*.pug`, series(buildHTML, reload));
};

export const dev = series(
  parallel(styles, scriptsLint, scripts, buildHTML),
  serve,
  watchForChanges
);

export const build = series(parallel(styles, scripts), stylesClearUnused);

export default dev;
