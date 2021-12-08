import gulp from 'gulp';

import { reload } from './server';
import { pages, html } from './templates';
import { css } from './styles';
import { scripts } from './scripts';
import { moduleImages } from './moduleImages';
import { staticFiles } from './staticFiles';
import { handleImages } from './images';

export const watch = () => {
  global.watch = true;
  const testsPatterns = [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
  ];

  // Modules, pages
  gulp
    .watch('source/**/*.pug', gulp.series(pages, reload))
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats,
      };
    });

  // Modules data
  gulp.watch('source/modules/**/*.yml', gulp.series(html, reload));

  // Styles
  gulp.watch('source/**/*.styl', gulp.series(css));

  // Scripts
  gulp.watch(
    'source/**/*.js',
    { ignored: testsPatterns },
    gulp.series(scripts, reload),
  );

  // Modules images
  // gulp.watch(
  //   'source/modules/*/images/**/*.{png,jpg,jpeg,gif,svg,webp}',
  //   gulp.series(moduleImages, reload),
  // );

  // Static files and assets
  gulp.watch('source/assets/**/{*,.*}', gulp.series(staticFiles, reload));

  // Images
  // gulp.watch('source/assets/images/**/{*,.*}', gulp.series(handleImages, reload));
};
