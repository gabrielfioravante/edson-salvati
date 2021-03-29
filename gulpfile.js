const {
  src, dest, series, watch,
} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

function html() {
  return src('src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function js() {
  return src('src/scripts/script.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(dest('dist'));
}

function scss() {
  const plugins = [
    autoprefixer({ grid: true }),
  ];
  return src('src/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest('dist'));
}

function img() {
  return src('src/images/*.*')
    .pipe(dest('dist/images'));
}

exports.html = html;
exports.js = js;
exports.scss = scss;
exports.img = img;

exports.build = series(html, scss, js, img);
exports.dev = () => {
  watch('src/index.html', html);
  watch('src/scripts/script.js', js);
  watch('src/scss/*/*.scss', scss);
  watch('src/images/*.*', img);
};
