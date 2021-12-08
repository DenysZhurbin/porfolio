import gulp from "gulp";
import gulpIf from "gulp-if";
import cache from "gulp-cached";
import progeny from "gulp-progeny";
import plumber from "gulp-plumber";
import stylus from "gulp-stylus";
import prettier from "gulp-prettier";
import cssnano from "cssnano";
import { plumberConfig, stylusConfig } from "../config";
import bs from "../util/getBrowserSyncInstance";
import { isDevelopment } from "../util/env";
import rename from "gulp-rename";
import unprefix from "postcss-unprefix";
import autoprefixer from "autoprefixer";
import postcss from "gulp-postcss";
const processors = [cssnano(), unprefix, autoprefixer({ grid: true })];

export const css = () =>
  gulp
    .src(["**/*.styl", "!**/_*.styl"], { cwd: "source/styles/**" })
    .pipe(cache())
    .pipe(progeny())
    .pipe(plumber(plumberConfig))
    .pipe(stylus(stylusConfig))
    .pipe(postcss(gulpIf(!isDevelopment, processors)))
    .pipe(gulpIf(isDevelopment, prettier()))
    .pipe(extractFromSubFolders())
    .pipe(gulp.dest("dest/stylesheets"))
    .pipe(bs.reload({ stream: true }));

const extractFromSubFolders = () => {
  return rename(_path => {
    _path.dirname = "/";
    _path.extname = ".css";
  });
};
