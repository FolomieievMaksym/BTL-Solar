const gulp = require("gulp");
const del = require("del");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const gcmq = require("gulp-group-css-media-queries");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const webp = require("gulp-webp");
const fileInclude = require("gulp-file-include");
const replace = require("gulp-replace");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const sourcemaps = require("gulp-sourcemaps");
const htmlmin = require("gulp-htmlmin");
// const typescript = require("gulp-typescript");
// const fonter = require("gulp-fonter");
// const { dest } = require("gulp");
// const concat = require("gulp-concat");
// const babel = require('gulp-babel')

const paths = {
   html: {
      app: "app/**/*.html",
      new: "app/_*.html",
      components: "app/components/**/*.html",
      dest: "docs/",
   },
   scss: {
      app: "app/scss/**/*.scss",
      dest: "docs/css/",
   },
   js: {
      app: {
         js: "app/js/**/*.js",
         ts: "app/js/**/*.ts",
      },
      dest: "docs/js/",
   },
   images: {
      app: {
         img: `app/img/**/*.{jpg,jpeg,gif,png}`,
         webp: "app/img/**/*.webp",
         svg: "app/img/**/*.svg",
         video: "app/img/*.mp4",
      },
      dest: "docs/img/",
   },
   fonts: {
      app: "app/fonts/",
      otf: "app/fonts/*.otf",
      ttf: "app/fonts/*.ttf",
      icons: "app/fonts/icons/*.*",
      dest: "docs/fonts",
   },
   files: {
      pdf: {
         file: "app/**/*.pdf",
         dest: "docs/",
      },
   },
};

// Очистить docs
function clean() {
   return del("docs/*");
}

// Копирование файлов
function copy() {
   return gulp.src(paths.files.pdf.file).pipe(gulp.dest(paths.files.pdf.dest));
}

// Очистить docs за исключением ./img в нём
function cleanSoft() {
   return del(["docs/*", "!docs/img", "!docs/fonts"]);
}

// Обработка html
function html() {
   return gulp
      .src([paths.html.app, "!" + paths.html.new, "!" + paths.html.components])
      .pipe(fileInclude())
      .pipe(replace(/@img\//g, "img/"))
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browsersync.stream());
}

function php() {
   return gulp.src(`./app/*.php`).pipe(gulp.dest(paths.html.dest));
}
function defaultFolder() {
   return gulp.src(`./app/default/**/*`).pipe(gulp.dest(`./docs/default/`));
}
// Ужимаем html
function htmlMin() {
   return gulp
      .src([paths.html.app, "!" + paths.html.new, "!" + paths.html.components])
      .pipe(fileInclude())
      .pipe(replace(/@img\//g, "img/"))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browsersync.stream());
}

function htmlComponents() {
   return gulp.src(paths.html.components).pipe(browsersync.stream());
}

// Обработка scss
function scss() {
   return gulp
      .src(paths.scss.app)
      .pipe(sass().on("error", sass.logError))
      .pipe(
         autoprefixer({
            cascade: false,
         })
      )
      .pipe(gcmq())
      .pipe(gulp.dest(paths.scss.dest))
      .pipe(
         cleanCSS({
            level: 2,
         })
      )
      .pipe(
         rename({
            suffix: ".min",
         })
      )
      .pipe(replace(/@img\//g, "../img/"))
      .pipe(gulp.dest(paths.scss.dest))
      .pipe(gulp.src("app/scss/**/*.min.css"))
      .pipe(gulp.dest(paths.scss.dest))
      .pipe(browsersync.stream());
}

// Обработка js
function js() {
   return (
      gulp
         .src([paths.js.app.js, "!" + "app/js/_*.js", "!" + "app/js/**/*.min.js"])
         .pipe(sourcemaps.init())
         // .pipe(babel({
         // 	presets: ['@babel/env']
         // }))
         .pipe(gulp.dest(paths.js.dest))
         .pipe(uglify())
         // .pipe(concat("main.min.js")) //Склеивание всех .js файлов в app/js/ и переименование
         .pipe(
            rename({
               suffix: ".min",
            })
         )
         .pipe(gulp.dest(paths.js.dest))
         .pipe(gulp.src("app/js/**/*.min.js"))
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(paths.js.dest))
         .pipe(browsersync.stream())
   );
}

// Обработка ts
// function ts() {
//    return gulp
//       .src(paths.js.app.ts)
//       .pipe(sourcemaps.init())
//       .pipe(
//          typescript({
//             noImplicitAny: true,
//             target: "ES6",
//          })
//       )
//       .pipe(gulp.dest(paths.js.dest))
//       .pipe(uglify())
//       .pipe(
//          rename({
//             suffix: ".min",
//          })
//       )
//       .pipe(sourcemaps.write())
//       .pipe(gulp.dest(paths.js.dest))
//       .pipe(browsersync.stream());
// }

// Обработка images
function img() {
   return gulp
      .src(paths.images.app.img)
      .pipe(newer(paths.images.dest))
      .pipe(
         imagemin([
            imageminJpegRecompress({
               progressive: true,
               min: 70,
               max: 75,
            }),
            pngquant({
               speed: 5,
               quality: [0.6, 0.8],
            }),
         ])
      )
      .pipe(gulp.dest(paths.images.dest))
      .pipe(gulp.src(paths.images.app.img))
      .pipe(webp())
      .pipe(newer(paths.images.dest))
      .pipe(gulp.dest(paths.images.dest))
      .pipe(gulp.src(paths.images.app.webp))
      .pipe(newer(paths.images.dest))
      .pipe(gulp.dest(paths.images.dest))
      .pipe(gulp.src(paths.images.app.svg))
      .pipe(newer(paths.images.dest))
      .pipe(gulp.dest(paths.images.dest))
      .pipe(gulp.src(paths.images.app.video))
      .pipe(newer(paths.images.dest))
      .pipe(gulp.dest(paths.images.dest));
}

// Обработка шрифтов (конвертация из off в ttf, из ttf в woff,woff2)
function fonts() {
   return (
      gulp
         // .src(paths.fonts.otf)
         // .pipe(
         //    fonter({
         //       formats: ["ttf"],
         //    })
         // )
         // .pipe(gulp.dest(paths.fonts.app))
         .src(paths.fonts.ttf)
         .pipe(ttf2woff())
         .pipe(gulp.dest(paths.fonts.dest))
         .pipe(gulp.src(paths.fonts.ttf))
         .pipe(ttf2woff2())
         .pipe(gulp.dest(paths.fonts.dest))
         .pipe(gulp.src(paths.fonts.icons))
         .pipe(gulp.dest(paths.fonts.dest))
   );
}

// Наблюдение за изменениями в исходных файлах
function watcher() {
   browsersync.init({
      server: {
         baseDir: "./docs",
      },
   });
   gulp.watch([paths.html.app, "!" + paths.html.new], html);
   gulp.watch(paths.html.components, htmlComponents);
   gulp.watch(paths.scss.app, scss);
   gulp.watch(paths.js.app.js, js);
   // gulp.watch(paths.js.app.ts, ts);
   gulp.watch(paths.images.app.img, img);
   gulp.watch(paths.images.app.svg, img);
}

exports.clean = clean;
exports.cleanSoft = cleanSoft;
exports.html = html;
exports.htmlMin = htmlMin;
exports.scss = scss;
exports.js = js;
// exports.ts = ts;
exports.img = img;
exports.php = php;
exports.defaultFolder = defaultFolder;
exports.fonts = fonts;
exports.copy = copy;
exports.watcher = watcher;

exports.default = gulp.series(cleanSoft, gulp.parallel(html, scss, js, img, php, defaultFolder, copy), watcher);
exports.build = gulp.series(clean, gulp.parallel(htmlMin, fonts, scss, js, img, php, defaultFolder, copy), watcher);
