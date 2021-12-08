import gulp from "gulp";
import plumber from "gulp-plumber";
import changed from "gulp-changed";
import rename from "gulp-rename";

import { plumberConfig } from "../config";

const updateModuleImagePath = path => {
  const updatedPath = path.dirname
    .split('/')
    .slice(0, -1)
    .join('/');

  path.dirname = updatedPath;
};

export const moduleImages = () => {
  return gulp
    .src("**/*.{png,jpg,jpeg,gif,svg,webp}", {
      cwd: "source/modules/**/images"
    })
    .pipe(plumber(plumberConfig))
    .pipe(rename(updateModuleImagePath))
    .pipe(changed("dest/images"))
    .pipe(gulp.dest("dest/images/_modules"));
};
