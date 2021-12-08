import gulp from "gulp";
import plumber from "gulp-plumber";
import changed from "gulp-changed";
import rename from "gulp-rename";
import { plumberConfig } from "../config";

const updateNodeModuleImagePath = path => {
  const updatedPath = path.dirname
    .split('/')
    .slice(0, -1)
    .join('/');

  path.dirname = updatedPath;
};

export const staticFiles = () =>
  gulp
    .src("**/{*,.*}", { cwd: "source/assets" })
    .pipe(plumber(plumberConfig))
    .pipe(changed("dest"))
    .pipe(gulp.dest("dest/"));

export const imagesFromNodeModules = () =>
  gulp
    .src("**/images/{*,.*}", { cwd: "node_modules/@pdffiller" })
    .pipe(rename(updateNodeModuleImagePath))
    .pipe(gulp.dest("dest/images"));
