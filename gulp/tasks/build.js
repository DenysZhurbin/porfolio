import gulp from 'gulp';

import { cleanup } from "./cleanup";
import { html } from "./templates";
import { staticFiles, imagesFromNodeModules } from "./staticFiles";
import { scripts, scriptsMobile, scriptsPageSpeed } from "./scripts";
import { css } from "./styles";
import { moduleImages } from "./images";
import { serviceWorker } from "./serviceWorker";
import { startMessage } from "./messages";
import { isLocal, isDevelopment } from "../util/env";

const noop = done => done();

export const build = gulp.series(
  startMessage,
  isLocal ? cleanup : noop,
  gulp.series(
    gulp.parallel(
      html,
      gulp.series(imagesFromNodeModules, staticFiles, moduleImages),
      scripts,
    ),
    css,
    isDevelopment ? noop : serviceWorker,
  )
);
