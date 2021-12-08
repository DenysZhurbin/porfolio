import gulp from "gulp";
import plumber from "gulp-plumber";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import logger from "gulplog";
import webpackConfig from "../../webpack.config.babel";
import { plumberConfig } from "../config";
import rename from "gulp-rename";

const extractFromSubFolders = () => {
  return rename(path => {
    path.dirname = "/";
  });
};

export const scripts = done => {
  let firstBuildReady = false;

  function webpackDone(err, stats) {
    firstBuildReady = true;

    if (err) {
      // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return; // emit('error', err) in webpack-stream
    }

    // https://webpack.js.org/api/node/#stats-object
    // https://webpack.js.org/configuration/stats/
    logger[stats.hasErrors() ? "error" : "info"](
      stats.toString({
        chunks: false, // Makes the build much quieter
        modules: false,
        colors: true // Shows colors in the console
      })
    );
  }

  return gulp
    .src(["*.js", "!_*.js"], { cwd: "source/scripts" })
    .pipe(plumber(plumberConfig))
    .pipe(webpackStream(webpackConfig, webpack, webpackDone))
    .pipe(gulp.dest("dest/javascripts"))
    .on("data", () => {
      if (firstBuildReady) {
        done();
      }
    });
};
